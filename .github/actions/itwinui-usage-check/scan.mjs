/**
 * Scans a pull request diff for newly added iTwinUI usage and reports it
 * via workflow annotations and the job summary.
 *
 * Only *added* lines are checked, so existing iTwinUI usage is grandfathered
 * and teams mid-migration are never blocked on untouched code.
 *
 * Runs without a checkout: the diff is read from the GitHub REST API.
 */

import { appendFileSync } from "node:fs";

const {
	GITHUB_TOKEN,
	GITHUB_REPOSITORY,
	PR_NUMBER,
	SEVERITY = "warning",
	GITHUB_API_URL = "https://api.github.com",
	GITHUB_STEP_SUMMARY,
	GITHUB_OUTPUT,
} = process.env;

const MIGRATION_GUIDE =
	"https://stratakit.bentley.com/docs/getting-started/migration-from-itwinui/";

if (!GITHUB_TOKEN || !GITHUB_REPOSITORY || !PR_NUMBER) {
	console.error(
		"Missing required environment variables (GITHUB_TOKEN, GITHUB_REPOSITORY, PR_NUMBER).",
	);
	process.exit(1);
}

if (SEVERITY !== "warning" && SEVERITY !== "error") {
	console.error(`Invalid severity "${SEVERITY}". Use "warning" or "error".`);
	process.exit(1);
}

/** Files where flagging iTwinUI mentions would only produce noise. */
const skippedFiles = [
	/(^|\/)pnpm-lock\.yaml$/,
	/(^|\/)package-lock\.json$/,
	/(^|\/)yarn\.lock$/,
	/(^|\/)npm-shrinkwrap\.json$/,
	/(^|\/)CHANGELOG\.md$/i,
	/\.mdx?$/, // prose may legitimately reference iTwinUI (e.g. migration docs)
	/\.snap$/,
];

/** Matches any iTwinUI package name, in imports and in package.json. */
const packagePattern = /@itwin\/itwinui(?:-[a-z][a-z-]*)*/g;
/** Matches iTwinUI CSS custom properties, e.g. --iui-color-background. */
const cssVariablePattern = /--iui-[a-zA-Z0-9_-]+/g;
/** Matches iTwinUI class names, e.g. iui-button. */
const classPattern = /(?<![\w$-])iui-[a-z][a-zA-Z0-9-]*/g;

/** Extracts named imports from a single-line import of @itwin/itwinui-react. */
const itwinuiReactImportPattern =
	/import\s+(?:type\s+)?\{([^}]*)\}\s*from\s*["']@itwin\/itwinui-react(?:\/[^"']*)?["']/;

const styleFilePattern = /\.(css|scss|sass|less|styl)$/;
const classContextPattern = /\bclass(Name)?\s*[=:]/;

async function fetchPullRequestFiles() {
	const files = [];
	for (let page = 1; ; page++) {
		const url = `${GITHUB_API_URL}/repos/${GITHUB_REPOSITORY}/pulls/${PR_NUMBER}/files?per_page=100&page=${page}`;
		const response = await fetch(url, {
			headers: {
				Authorization: `Bearer ${GITHUB_TOKEN}`,
				Accept: "application/vnd.github+json",
				"X-GitHub-Api-Version": "2022-11-28",
			},
		});
		if (!response.ok) {
			throw new Error(
				`Failed to fetch PR files (${response.status} ${response.statusText}) from ${url}`,
			);
		}
		const batch = await response.json();
		files.push(...batch);
		if (batch.length < 100) return files;
	}
}

/** Yields { line, text } for every added line in a unified diff patch. */
function* addedLines(patch) {
	let newLine = 0;
	for (const text of patch.split("\n")) {
		const hunk = text.match(/^@@ -\d+(?:,\d+)? \+(\d+)(?:,\d+)? @@/);
		if (hunk) {
			newLine = Number(hunk[1]);
			continue;
		}
		if (text.startsWith("+")) {
			yield { line: newLine, text: text.slice(1) };
			newLine++;
		} else if (!text.startsWith("-") && !text.startsWith("\\")) {
			newLine++;
		}
	}
}

function componentSuggestion(lineText) {
	const namedImports = lineText.match(itwinuiReactImportPattern);
	if (!namedImports) return "";
	const components = namedImports[1]
		.split(",")
		.map((name) =>
			name
				.replace(/\s+as\s+.*/, "")
				.replace(/^type\s+/, "")
				.trim(),
		)
		.filter(Boolean);
	if (components.length === 0) return "";
	const links = components
		.map((name) => `${MIGRATION_GUIDE}#${name.toLowerCase()}`)
		.join(" , ");
	return ` Replacement for ${components.join(", ")}: ${links}`;
}

function scanLine(file, lineText) {
	const matches = [];
	for (const match of lineText.matchAll(packagePattern)) {
		matches.push({
			match: match[0],
			message: `New iTwinUI dependency usage ("${match[0]}"). StrataKit is replacing iTwinUI — use StrataKit instead. See ${MIGRATION_GUIDE}${componentSuggestion(lineText)}`,
		});
	}
	for (const match of lineText.matchAll(cssVariablePattern)) {
		matches.push({
			match: match[0],
			message: `New iTwinUI CSS variable ("${match[0]}"). Use StrataKit design tokens instead. See ${MIGRATION_GUIDE}`,
		});
	}
	// Bare `iui-` class names are only checked where class names plausibly
	// appear, to avoid false positives on unrelated identifiers.
	if (styleFilePattern.test(file) || classContextPattern.test(lineText)) {
		for (const match of lineText.matchAll(classPattern)) {
			matches.push({
				match: match[0],
				message: `New iTwinUI class name ("${match[0]}"). Use StrataKit components/styles instead. See ${MIGRATION_GUIDE}`,
			});
		}
	}
	return matches;
}

/** Escapes a value for use in a workflow command message. */
const escapeData = (value) =>
	value.replaceAll("%", "%25").replaceAll("\r", "%0D").replaceAll("\n", "%0A");
/** Escapes a value for use in a workflow command property. */
const escapeProperty = (value) =>
	escapeData(value).replaceAll(":", "%3A").replaceAll(",", "%2C");

const findings = [];
const unscannedFiles = [];

for (const file of await fetchPullRequestFiles()) {
	if (file.status === "removed") continue;
	if (skippedFiles.some((pattern) => pattern.test(file.filename))) continue;
	if (!file.patch) {
		// The API omits patches for very large or binary files.
		if (file.additions > 0) unscannedFiles.push(file.filename);
		continue;
	}
	for (const { line, text } of addedLines(file.patch)) {
		for (const { match, message } of scanLine(file.filename, text)) {
			findings.push({ file: file.filename, line, match, message });
		}
	}
}

for (const { file, line, message } of findings) {
	console.log(
		`::${SEVERITY} file=${escapeProperty(file)},line=${line},title=${escapeProperty("New iTwinUI usage")}::${escapeData(message)}`,
	);
}

if (GITHUB_OUTPUT) {
	appendFileSync(GITHUB_OUTPUT, `findings-count=${findings.length}\n`);
}

if (GITHUB_STEP_SUMMARY) {
	let summary = "## iTwinUI usage check\n\n";
	if (findings.length === 0) {
		summary += "✅ No new iTwinUI usage introduced in this pull request.\n";
	} else {
		summary += `Found **${findings.length}** newly added iTwinUI usage(s). `;
		summary += `StrataKit is replacing iTwinUI — see the [migration guide](${MIGRATION_GUIDE}).\n\n`;
		summary += "| File | Line | Match |\n| --- | --- | --- |\n";
		for (const { file, line, match } of findings) {
			summary += `| \`${file}\` | ${line} | \`${match}\` |\n`;
		}
	}
	if (unscannedFiles.length > 0) {
		summary += `\n> [!NOTE]\n> ${unscannedFiles.length} file(s) were too large to scan: ${unscannedFiles.map((f) => `\`${f}\``).join(", ")}\n`;
	}
	appendFileSync(GITHUB_STEP_SUMMARY, summary);
}

if (findings.length > 0) {
	console.log(`Found ${findings.length} new iTwinUI usage(s).`);
	if (SEVERITY === "error") process.exit(1);
} else {
	console.log("No new iTwinUI usage found.");
}
