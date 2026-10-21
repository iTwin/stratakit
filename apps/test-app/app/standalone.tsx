/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { useLocation } from "react-router";

import styles from "./standalone.module.css";

// ----------------------------------------------------------------------------

export const handle = { density: "loose" } as const;

// ----------------------------------------------------------------------------

type ComponentModule = Record<string, unknown> & {
	default: React.FC<Record<string, unknown>>;
};

/** Map of module paths to their respective dynamic import functions. */
const moduleLoaders = new Map(
	Object.entries({
		...import.meta.glob<ComponentModule>("./**/*.showcase.tsx"), // all `.showcase` files within test-app
		...import.meta.glob<ComponentModule>(
			"./examples/*/*.{tsx,jsx}", // all files within the `examples` package
			{ base: "../../../" },
		),
	}).map(([path, loadModule]) => [
		path.replace("./", "").replace(/\.(tsx|jsx)$/, ""), // e.g. `./mui/Button.showcase.tsx` → `mui/Button.showcase`
		loadModule, // e.g. () => import("./mui/Button.showcase.tsx")
	]),
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
					<React.Suspense
						fallback={<div data-testid="showcase-loading">Loading…</div>}
					>
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

	return <Component {...props} />;
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
