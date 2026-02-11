/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { IconButton } from "@stratakit/bricks";
import { Root } from "@stratakit/mui";
import { useColorScheme } from "./~utils.ts";

import svgWindowPopout from "@stratakit/icons/window-popout.svg";
import styles from "./ExamplePreview.module.css";

// ----------------------------------------------------------------------------

// Pre-calculate all example modules so Vite can statically analyze them for bundling.
// This requires that the path to examples dir is hardcoded (i.e. no dynamic expressions).
const exampleModules = {
	bricks: import.meta.glob("/node_modules/examples/bricks/*.tsx"),
	structures: import.meta.glob("/node_modules/examples/structures/*.tsx"),
	mui: import.meta.glob("/node_modules/examples/mui/*.tsx"),
} as const;

// ----------------------------------------------------------------------------

export function ExampleEmbed({ src }: { src: string }) {
	const { exampleName, packageName } = parseSrc(src);
	const labelId = React.useId();

	return (
		<Root
			colorScheme={useColorScheme()}
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
			</div>
		</Root>
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
