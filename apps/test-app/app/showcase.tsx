/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { useLocation } from "react-router";
import Stack from "@mui/material/Stack";

import styles from "./showcase.module.css";

// ----------------------------------------------------------------------------

type ShowcaseModule = Record<string, unknown> & { default: React.FC };

/** Map of component IDs to dynamic import functions for their respective showcase modules. */
const showcaseModuleLoaders = new Map(
	Object.entries(import.meta.glob<ShowcaseModule>("./mui/*.showcase.tsx")).map(
		([path, loadModule]) => [
			path.replace(/^\.\//, "").replace(/\.showcase\.tsx$/, ""), // e.g. "mui/Button"
			loadModule, // e.g. () => import("./mui/Button.showcase.tsx")
		],
	),
);
const showcasePromises = new Map<string, Promise<React.FC>>();

// ----------------------------------------------------------------------------

export default function Showcase() {
	const { search } = useLocation();
	const searchParams = new URLSearchParams(search);
	const componentId = searchParams.get("component") ?? "";
	const exportName = searchParams.get("export") ?? undefined;

	const title = (() => {
		let suffix = componentId;
		if (exportName) suffix += `#${exportName}`;
		return `Showcase${suffix ? ` (${suffix})` : ""}`;
	})();

	return (
		<>
			<title>{`${title} – StrataKit`}</title>
			<div id="root" className={styles.root}>
				{componentId && (
					<React.Suspense fallback={null}>
						<ShowcaseRenderer
							componentId={componentId}
							exportName={exportName}
						/>
					</React.Suspense>
				)}
			</div>
		</>
	);
}

// ----------------------------------------------------------------------------

interface ShowcaseRendererProps {
	componentId: string;
	exportName?: string;
}

function ShowcaseRenderer({ componentId, exportName }: ShowcaseRendererProps) {
	const Showcase = React.use(loadShowcase(componentId, exportName));

	if (exportName) return <Showcase />;

	return (
		<Stack spacing={4} sx={{ alignItems: "start" }}>
			<Showcase />
		</Stack>
	);
}

// ----------------------------------------------------------------------------

/**
 * Loads (and caches) the showcase module for a component ID.
 *
 * @param componentId The ID of the component whose showcase module should be loaded.
 * @param exportName The named export to load. If omitted, the `default` export is loaded.
 *
 * @returns A promise that resolves to the React component representing the showcase. Can be used with `React.use()`.
 */
function loadShowcase(
	componentId: string,
	exportName?: string,
): Promise<React.FC> {
	const loadModule = showcaseModuleLoaders.get(componentId);
	if (!loadModule) throw new Error(`Unknown showcase module: ${componentId}`);

	const cacheKey = `${componentId}#${exportName}`;
	const cachedPromise = showcasePromises.get(cacheKey);
	if (cachedPromise) return cachedPromise;

	const promise = loadModule().then((module) => {
		const Showcase = module[exportName ?? "default"];
		if (typeof Showcase !== "function")
			throw new Error(`Unknown showcase: ${cacheKey}`);
		return Showcase as React.FC;
	});
	showcasePromises.set(cacheKey, promise);

	return promise;
}
