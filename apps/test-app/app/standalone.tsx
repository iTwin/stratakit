/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { useLocation } from "react-router";
import Stack from "@mui/material/Stack";

import styles from "./standalone.module.css";

// ----------------------------------------------------------------------------

type ComponentModule = Record<string, unknown> & {
	default: React.FC<Record<string, unknown>>;
};

/** Map of module paths to their respective dynamic import functions. */
const moduleLoaders = new Map(
	Object.entries(import.meta.glob<ComponentModule>("./mui/*.tsx")).map(
		([path, loadModule]) => [
			path.replace(/^\.\//, "").replace(/\.tsx$/, ""), // e.g. "mui/Button.showcase"
			loadModule, // e.g. () => import("./mui/Button.showcase.tsx")
		],
	),
);
const modulePromises = new Map<
	string,
	Promise<React.FC<Record<string, unknown>>>
>();

// ----------------------------------------------------------------------------

export default function Standalone() {
	const { search } = useLocation();
	const searchParams = new URLSearchParams(search);
	const modulePath = searchParams.get("path") ?? "";
	const exportName = searchParams.get("export") ?? undefined;
	const props = JSON.parse(searchParams.get("props") ?? "{}") as Record<
		string,
		unknown
	>;

	const title = (() => {
		if (!modulePath) return "Standalone";
		if (exportName) return `${modulePath}#${exportName}`;
		return modulePath;
	})();

	return (
		<>
			<title>{`${title} – StrataKit`}</title>
			<div id="root" className={styles.root}>
				{modulePath && (
					<React.Suspense fallback={null}>
						<StandaloneRenderer
							modulePath={modulePath}
							exportName={exportName}
							props={props}
						/>
					</React.Suspense>
				)}
			</div>
		</>
	);
}

// ----------------------------------------------------------------------------

interface StandaloneRendererProps {
	modulePath: string;
	exportName?: string;
	props: Record<string, unknown>;
}

function StandaloneRenderer({
	modulePath,
	exportName,
	props,
}: StandaloneRendererProps) {
	const Component = React.use(loadModule(modulePath, exportName));

	if (exportName) return <Component {...props} />;

	return (
		<Stack spacing={4} sx={{ alignItems: "start" }}>
			<Component {...props} />
		</Stack>
	);
}

// ----------------------------------------------------------------------------

/**
 * Loads (and caches) a component module, returning its default or named export.
 *
 * @param path The extensionless path of the component module which should be loaded.
 * @param exportName The named export to load. If omitted, the `default` export is loaded.
 *
 * @returns A promise that resolves to the React component to render standalone. Can be used with `React.use()`.
 */
function loadModule(path: string, exportName?: string) {
	exportName ??= "default";

	const load = moduleLoaders.get(path);
	if (!load) throw new Error(`Unknown module: ${path}.tsx`);

	const cacheKey = `${path}#${exportName}`;
	const cachedPromise = modulePromises.get(cacheKey);
	if (cachedPromise) return cachedPromise;

	const promise = load().then((module) => {
		const Component = module[exportName];
		if (typeof Component !== "function")
			throw new Error(`Unsupported export "${exportName}" in ${path}.tsx`);
		return Component as React.FC<Record<string, unknown>>;
	});
	modulePromises.set(cacheKey, promise);

	return promise;
}
