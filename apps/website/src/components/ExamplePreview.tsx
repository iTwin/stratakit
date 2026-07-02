/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { Box, Button, IconButton, Paper, Skeleton } from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { Icon, Root } from "@stratakit/mui";
import { codeToHtml } from "shiki";
import { useColorScheme } from "./~utils.ts";

import svgCopy from "@stratakit/icons/copy.svg";
import svgScript from "@stratakit/icons/script.svg";
import svgError from "@stratakit/icons/status-error.svg";
import svgSuccess from "@stratakit/icons/status-success.svg";
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

type Status = "idle" | "loading" | "complete" | "error";

function useSourceCode(src: string) {
	const [status, setStatus] = React.useState<Status>("idle");
	const [source, setSource] = React.useState<string | null>(null);

	const { exampleName, packageName } = parseSrc(src);
	const modulePath = `/node_modules/examples/${packageName}/${exampleName}.tsx`;

	React.useEffect(() => {
		const load = async () => {
			try {
				const sources =
					exampleSources[packageName as keyof typeof exampleSources];
				const sourceLoader = sources[modulePath] as () => Promise<string>;
				if (!sourceLoader) {
					setStatus("error");
					return;
				}

				const source = await sourceLoader();
				setSource(source);
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
		load();
	}, [exampleName, packageName]);

	return { status, source };
}

/** Extract the return statement/value from a component's JSX body */
const extractReturnValue = (code: string): string | null => {
	// Try multi-line format with parentheses first
	let returnMatch = code.match(/return\s*\(\n([\s\S]*?)\n\s*\);/);
	let returnContent = returnMatch?.[1];

	// If not found, try single-line format
	if (!returnContent) {
		returnMatch = code.match(/return\s+(<[\s\S]*?);/);
		returnContent = returnMatch?.[1];
	}

	if (!returnContent) return null;

	// Remove wrapping parentheses if they exist
	if (returnContent.startsWith("(") && returnContent.endsWith(")")) {
		returnContent = returnContent.slice(1, -1);
	}

	return returnContent.trimEnd();
};

const stripBentleyHeader = (code: string) => {
	return code.replace(/\/\*-+[\s\S]*?-+\*\/\n*/, "").trim();
};

/** Remove indentation based on the first line's indent */
const removeLeadingIndentation = (code: string): string => {
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

function truncateCode(code: string) {
	const noTabs = code.replace(/\t/g, "  "); // use two spaces for tab indent
	const full = stripBentleyHeader(noTabs);
	const justReturn = extractReturnValue(full);
	const snippet = removeLeadingIndentation(justReturn ?? "");

	return { full, snippet };
}

function CopyButton({ valueToCopy }: { valueToCopy: string }) {
	const [status, setStatus] = React.useState<Status>("idle");

	React.useEffect(() => {
		if (status !== "complete" && status !== "error") {
			return;
		}

		const timeoutId = setTimeout(() => {
			setStatus("idle");
		}, 2500);
		return () => window.clearTimeout(timeoutId);
	}, [status]);

	let color: React.ComponentProps<typeof IconButton>["color"];
	let message = "";
	switch (status) {
		case "idle":
		case "loading":
			color = undefined;
			break;
		case "complete":
			color = "primary";
			message = "Code copied to clipboard";
			break;
		case "error":
			color = "error";
			message = "Failed to copy";
			break;
	}

	return (
		<>
			<IconButton
				label="Copy"
				color={color}
				className={styles.copyButton}
				onClick={() => {
					setStatus("loading");
					navigator.clipboard
						.writeText(valueToCopy)
						.then(() => {
							setStatus("complete");
						})
						.catch((error) => {
							setStatus("error");
							console.error("failed to copy code to clipboard", error);
						});
				}}
			>
				<Icon
					href={svgError}
					className={styles.copyButtonIcon}
					data-active={status === "error"}
				/>
				<Icon
					href={svgCopy}
					className={styles.copyButtonIcon}
					data-active={status === "idle" || status === "loading"}
				/>
				<Icon
					href={svgSuccess}
					className={styles.copyButtonIcon}
					data-active={status === "complete"}
				/>
			</IconButton>
			<Box sx={visuallyHidden} aria-live="polite">
				{message}
			</Box>
		</>
	);
}

export function ExampleEmbed({ src }: { src: string }) {
	const { exampleName, packageName } = parseSrc(src);
	const labelId = React.useId();
	const [codeExpanded, setCodeExpanded] = React.useState(false);
	const codeId = React.useId();

	const { source, status } = useSourceCode(src);
	const { full, snippet } = React.useMemo(
		() => (source ? truncateCode(source) : { full: "", snippet: "" }),
		[source],
	);

	const codeToShow = codeExpanded ? full : snippet;

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

			<Paper elevation={2} className={styles.toolbar}>
				<Button
					variant="text"
					size="small"
					aria-expanded={codeExpanded}
					aria-controls={codeId}
					onClick={() => {
						setCodeExpanded((expanded) => !expanded);
					}}
				>
					{codeExpanded ? "Collapse source" : "Expand source"}
				</Button>
				<CopyButton valueToCopy={codeToShow} />
				<IconButton
					label="Open in new tab"
					render={
						<a
							href={`${import.meta.env.BASE_URL}/examples/${src}`}
							target="_blank"
						/>
					}
				>
					<Icon href={svgWindowPopout} />
				</IconButton>
				<IconButton
					label="View source on GitHub"
					render={<a href={`${examplesSrcUrl}${src}.tsx`} target="_blank" />}
				>
					<Icon href={svgScript} />
				</IconButton>
			</Paper>
			{status === "complete" ? (
				<CodeBlock code={codeToShow} id={codeId} />
			) : (
				<CodeSkeleton />
			)}
		</div>
	);
}

function CodeSkeleton() {
	return (
		<div className={styles.code} data-status={status}>
			<pre>
				<Skeleton width="10rem" />
				<Skeleton sx={{ marginInlineStart: "1rem" }} width="50%" />
				<Skeleton sx={{ marginInlineStart: "1rem" }} width="20%" />
				<Skeleton sx={{ marginInlineStart: "1rem" }} width="25%" />
				<Skeleton width="1rem" />
			</pre>
		</div>
	);
}

function CodeBlock({ code, id }: { code: string; id?: string }) {
	const [formattedHtml, setFormattedHtml] = React.useState("");

	React.useEffect(() => {
		codeToHtml(code, {
			lang: "tsx",
			theme: "github-dark",
		}).then(setFormattedHtml);
	}, [code]);

	return (
		<div
			id={id}
			className={styles.code}
			dangerouslySetInnerHTML={{
				__html: formattedHtml,
			}}
		/>
	);
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
