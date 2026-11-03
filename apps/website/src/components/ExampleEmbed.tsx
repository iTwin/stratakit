/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import IconButton from "@mui/material/IconButton";
import { svgChevronDown } from "@stratakit/icons/chevron-down";
import { svgScript } from "@stratakit/icons/script";
import { svgWindowPopout } from "@stratakit/icons/window-popout";
import { Icon } from "@stratakit/mui";

import styles from "./ExampleEmbed.module.css";

// ----------------------------------------------------------------------------

/** Base URL for the `examples` workspace package on github */
const examplesSrcUrl = "https://github.com/iTwin/stratakit/tree/main/examples/";

// Pre-calculate all example modules so Vite can statically analyze them for bundling.
// This requires that the path to examples dir is hardcoded (i.e. no dynamic expressions).
const exampleModules = {
	bricks: import.meta.glob("/node_modules/examples/bricks/*.tsx"),
	structures: import.meta.glob("/node_modules/examples/structures/*.tsx"),
	mui: import.meta.glob("/node_modules/examples/mui/*.tsx"),
	composite: import.meta.glob("/node_modules/examples/composite/*.tsx"),
} as const;

// ----------------------------------------------------------------------------

interface ExampleEmbedProps {
	/** Name of the example file (including package), e.g. "mui/Button.default". */
	src: string;
	/** Callback invoked when the "Source code" button is clicked. */
	onSourceToggle: (expanded: boolean) => void;
}

export function ExampleEmbed(props: ExampleEmbedProps) {
	const { src, onSourceToggle } = props;

	const { exampleName, packageName } = parseSrc(src);
	const labelId = React.useId();
	const [sourceExpanded, setSourceExpanded] = React.useState(false);

	return (
		<div
			slot="preview"
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
					label="Source code"
					size="small"
					aria-expanded={sourceExpanded}
					onClick={() => {
						const expanded = !sourceExpanded;
						setSourceExpanded(expanded);
						onSourceToggle(expanded);
					}}
					className={styles.sourceCodeButton}
				>
					<Icon href={svgChevronDown} />
				</IconButton>
				<IconButton
					label="Open in new tab"
					size="small"
					href={getStandaloneExampleUrl(src)}
					target="_blank"
				>
					<Icon href={svgWindowPopout} />
				</IconButton>
				<IconButton
					label="View source on GitHub"
					size="small"
					href={`${examplesSrcUrl}${src}.tsx`}
					target="_blank"
				>
					<Icon href={svgScript} />
				</IconButton>
			</div>
		</div>
	);
}

// ----------------------------------------------------------------------------

function ExamplePreview({
	exampleName,
	packageName,
}: {
	exampleName: string;
	packageName: string;
}) {
	const ExampleComponent = React.useMemo(() => {
		const modules = exampleModules[packageName as keyof typeof exampleModules];
		const modulePath = `/node_modules/examples/${packageName}/${exampleName}.tsx`;
		const lazyImport = modules[modulePath] as () => Promise<{
			default: React.ComponentType;
		}>;
		return React.lazy(lazyImport);
	}, [exampleName, packageName]);

	return (
		<React.Suspense>
			<ExampleComponent />
		</React.Suspense>
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

// ----------------------------------------------------------------------------

/** Returns a URL to the standalone example page, using the test-app's [`/standalone` route](../../../test-app/app/standalone.tsx). */
export function getStandaloneExampleUrl(src: string) {
	const base = import.meta.env.BASE_URL.replace(/\/$/, "");

	// The `/standalone` route is hosted one level above the `/docs` base.
	let url = new URL(`${base}/../standalone`, import.meta.env.SITE);
	if (import.meta.env.DEV) {
		url = new URL("http://localhost:1800/standalone"); // We use a separate dev server for `test-app`.
	}
	url.searchParams.set("path", `examples/${src}`);

	return url.href;
}
