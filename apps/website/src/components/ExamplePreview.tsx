/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { IconButton } from "@stratakit/bricks";
import { Root } from "@stratakit/mui";
import { codeToHtml } from "shiki";
import { useColorScheme } from "./~utils.ts";

import svgScript from "@stratakit/icons/script.svg";
import svgWindowPopout from "@stratakit/icons/window-popout.svg";
import styles from "./ExamplePreview.module.css";

// ----------------------------------------------------------------------------

/** Base URL for the `examples` workspace package on github */
const examplesSrcUrl = "https://github.com/iTwin/stratakit/tree/main/examples/";

// Pre-calculate all example modules so Vite can statically analyze them for bundling.
// This requires that the path to examples dir is hardcoded (i.e. no dynamic expressions).
const exampleModules = {
	bricks: import.meta.glob("/node_modules/examples/bricks/*.tsx"),
	structures: import.meta.glob("/node_modules/examples/structures/*.tsx"),
	mui: import.meta.glob("/node_modules/examples/mui/*.tsx"),
} as const;

// Pre-calculate all example source files (raw text).
const exampleSources = {
	bricks: import.meta.glob("/node_modules/examples/bricks/*.tsx", {
		query: "?raw",
		import: "default",
	}),
	structures: import.meta.glob("/node_modules/examples/structures/*.tsx", {
		query: "?raw",
		import: "default",
	}),
	mui: import.meta.glob("/node_modules/examples/mui/*.tsx", {
		query: "?raw",
		import: "default",
	}),
} as const;

// ----------------------------------------------------------------------------

export function ExampleEmbed({ src }: { src: string }) {
	const { exampleName, packageName } = parseSrc(src);
	const labelId = React.useId();

	return (
		<div
			className={styles.exampleEmbedRoot}
			role="group"
			aria-labelledby={labelId}
		>
			<span id={labelId} hidden>
				Live example ({src})
			</span>

			<div className={styles.examplePreviewWrapper}>
				<ExamplePreview exampleName={exampleName} packageName={packageName} />
			</div>

			<div className={styles.toolbar}>
				<IconButton
					icon={svgWindowPopout}
					label="Open in new tab"
					variant="ghost"
					render={
						<a
							href={`${import.meta.env.BASE_URL}/examples/${src}`}
							target="_blank"
						/>
					}
				/>
				<IconButton
					icon={svgScript}
					label="View source on GitHub"
					variant="ghost"
					render={<a href={`${examplesSrcUrl}${src}.tsx`} target="_blank" />}
				/>
			</div>
			<ExampleSource src={src} />
		</div>
	);
}

const stripBentleyHeader = (code: string) => {
	return code.replace(/\/\*-+[\s\S]*?-+\*\/\n*/, "").trim();
};

/** Extract the return statement/value from a component's JSX body */
const extractReturnValue = (code: string): string | null => {
	// Match return statement and extract its content, preserving first line indentation
	const returnMatch = code.match(/return\s*\(\n([\s\S]*?)\n\s*\);/);
	if (!returnMatch) return null;

	let returnContent = returnMatch[1];

	// Remove wrapping parentheses if they exist
	if (returnContent.startsWith("(") && returnContent.endsWith(")")) {
		returnContent = returnContent.slice(1, -1);
	}

	return returnContent.trimEnd();
};

/** Remove indentation based on the first line's indent */
const dedentByFirstLine = (code: string): string => {
	const lines = code.split("\n");
	if (lines.length === 0) return code;

	// Get indentation of the first line
	const firstLineMatch = lines[0].match(/^(\s*)/);
	const firstLineIndent = firstLineMatch ? firstLineMatch[1].length : 0;

	// Remove that amount of indentation from all lines
	return lines
		.map((line) => (line.length === 0 ? line : line.slice(firstLineIndent)))
		.join("\n")
		.trim();
};

function ExampleSource({
	src,
	view,
}: {
	src: string;
	view: "snippet" | "full";
}) {
	const [codeHtml, setCodeHtml] = React.useState<{
		snippet: string;
		full: string;
	} | null>(null);
	const [status, setStatus] = React.useState<
		"idle" | "loading" | "complete" | "error"
	>("idle");

	const { exampleName, packageName } = parseSrc(src);
	const modulePath = `/node_modules/examples/${packageName}/${exampleName}.tsx`;

	React.useEffect(() => {
		const loadFullSources = async () => {
			try {
				const sources =
					exampleSources[packageName as keyof typeof exampleSources];
				const sourceLoader = sources[modulePath] as () => Promise<string>;
				if (!sourceLoader) {
					setStatus("error");
					return;
				}

				let source = await sourceLoader();
				source = stripBentleyHeader(source);
				source = source.replace(/\t/g, "  "); // use two spaces for tab indent

				const fullHtml = await codeToHtml(source, {
					lang: "tsx",
					theme: "github-dark",
				});

				let snippet = extractReturnValue(source);
				snippet = dedentByFirstLine(snippet ?? "");
				const snippetHtml = await codeToHtml(snippet, {
					lang: "tsx",
					theme: "github-dark",
				});

				setCodeHtml({ snippet: snippetHtml, full: fullHtml });
				setStatus("complete");
			} catch (error) {
				setStatus("error");
				console.error(
					`Failed to load source for ${packageName}/${exampleName}:`,
					error,
				);
			}
		};

		setStatus("loading");
		loadFullSources();
	}, [exampleName, packageName]);

	const html = view === "snippet" ? codeHtml?.snippet : codeHtml?.full;

	switch (status) {
		case "idle":
		case "loading":
			return <div>Loading</div>;
		case "complete":
			return (
				<div
					className={styles.code}
					dangerouslySetInnerHTML={{
						__html: html ?? "",
					}}
				/>
			);
		case "error":
			return <div>Error</div>;
	}
}

// ----------------------------------------------------------------------------

export function ExamplePreview({
	exampleName,
	packageName,
	withRoot,
}: {
	exampleName: string;
	packageName: string;
	withRoot?: boolean;
}) {
	const ExampleComponent = React.useMemo(() => {
		const modules = exampleModules[packageName as keyof typeof exampleModules];
		const modulePath = `/node_modules/examples/${packageName}/${exampleName}.tsx`;
		const lazyImport = modules[modulePath] as () => Promise<{
			default: React.ComponentType;
		}>;
		return React.lazy(lazyImport);
	}, [exampleName, packageName]);

	const colorScheme = useColorScheme();

	const content = (
		<React.Suspense>
			<ExampleComponent />
		</React.Suspense>
	);

	if (!withRoot) return content;

	return (
		<Root colorScheme={colorScheme} style={{ display: "contents" }}>
			{content}
		</Root>
	);
}

// ----------------------------------------------------------------------------

/** `"mui/Button.default"` → `{ packageName: "mui", exampleName: "Button.default" }` */
function parseSrc(src: string) {
	const [packageName, exampleName] = src.split("/", 2);
	if (!packageName || !exampleName) {
		throw new Error(`Invalid example src: ${src}`);
	}
	return { packageName, exampleName };
}
