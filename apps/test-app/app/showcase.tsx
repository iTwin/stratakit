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

/** Map of module paths to their respective dynamic import functions. */
const moduleLoaders = new Map(
	Object.entries(import.meta.glob<ShowcaseModule>("./mui/*.tsx")).map(
		([path, loadModule]) => [
			path.replace(/^\.\//, "").replace(/\.tsx$/, ""), // e.g. "mui/Button.showcase"
			loadModule, // e.g. () => import("./mui/Button.showcase.tsx")
		],
	),
);
const modulePromises = new Map<string, Promise<React.FC>>();

// ----------------------------------------------------------------------------

export default function Showcase() {
	const { search } = useLocation();
	const searchParams = new URLSearchParams(search);
	const modulePath = searchParams.get("path") ?? "";
	const exportName = searchParams.get("export") ?? undefined;

	const title = (() => {
		if (!modulePath) return "Showcase";
		if (exportName) return `${modulePath}#${exportName}`;
		return modulePath;
	})();

	return (
		<>
			<title>{`${title} – StrataKit`}</title>
			<div id="root" className={styles.root}>
				{modulePath && (
					<React.Suspense fallback={null}>
						<ShowcaseRenderer modulePath={modulePath} exportName={exportName} />
					</React.Suspense>
				)}
			</div>
		</>
	);
}

// ----------------------------------------------------------------------------

interface ShowcaseRendererProps {
	modulePath: string;
	exportName?: string;
}

function ShowcaseRenderer({ modulePath, exportName }: ShowcaseRendererProps) {
	const Showcase = React.use(loadModule(modulePath, exportName));

	if (exportName) return <Showcase />;

	return (
		<Stack spacing={4} sx={{ alignItems: "start" }}>
			<Showcase />
		</Stack>
	);
}

// ----------------------------------------------------------------------------

/**
 * Loads (and caches) a showcase module, returning its default or named export.
 *
 * @param path The extensionless path of the showcase module which should be loaded.
 * @param exportName The named export to load. If omitted, the `default` export is loaded.
 *
 * @returns A promise that resolves to the React component representing the showcase. Can be used with `React.use()`.
 */
function loadModule(path: string, exportName?: string): Promise<React.FC> {
	const load = moduleLoaders.get(path);
	if (!load) throw new Error(`Unknown showcase module: ${path}`);

	const cacheKey = `${path}#${exportName}`;
	const cachedPromise = modulePromises.get(cacheKey);
	if (cachedPromise) return cachedPromise;

	const promise = load().then((module) => {
		const Showcase = module[exportName ?? "default"];
		if (typeof Showcase !== "function")
			throw new Error(`Unknown module: ${cacheKey}`);
		return Showcase as React.FC;
	});
	modulePromises.set(cacheKey, promise);

	return promise;
}
