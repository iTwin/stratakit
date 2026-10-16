/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { IconButton } from "@stratakit/bricks";
import { svgScript } from "@stratakit/icons/script";
import { svgWindowPopout } from "@stratakit/icons/window-popout";

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
					render={<a href={getStandaloneExampleUrl(src)} target="_blank" />}
				/>
				<IconButton
					icon={svgScript}
					label="View source on GitHub"
					variant="ghost"
					render={<a href={`${examplesSrcUrl}${src}.tsx`} target="_blank" />}
				/>
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
