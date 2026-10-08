/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { useLocation } from "react-router";

import type { Route } from "./+types/standalone.ts";

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
							key={`${modulePath}#${exportName ?? "default"}`}
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

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
	return <pre>{error instanceof Error ? error.message : String(error)}</pre>;
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

// ----------------------------------------------------------------------------

// Playwright component testing requires exposing `window.mount` and `window.unmount` functions.
// See https://playwright.dev/docs/api/class-fixtures#fixtures-mount

declare global {
	interface Window {
		mount(params: MountParams): Promise<void>;
		unmount(): Promise<void>;
	}
}
type MountParams = {
	story: string;
	props?: Record<string, unknown>;
};

if (typeof window !== "undefined") {
	// Updates the URL search params based on the `story` and `props`.
	window.mount = async ({ story, props = {} }) => {
		const [modulePath, exportName] = story.split("#");

		const url = new URL(window.location.href);
		url.search = new URLSearchParams({
			path: modulePath,
			props: JSON.stringify(props),
			...(exportName && { export: exportName }),
		}).toString();

		await window.navigation.navigate(url.href, {
			history: "replace",
			info: "showcase",
		}).finished;
	};

	// Clears the URL search params.
	window.unmount = async () => {
		const url = new URL(window.location.href);
		url.search = "";

		await window.navigation.navigate(url.href, {
			history: "replace",
			info: "showcase",
		}).finished;
	};

	// Intercepts navigation events to handle client-side navigation.
	const controller = new AbortController();
	window.navigation.addEventListener(
		"navigate",
		(event) => {
			if (event.info !== "showcase" || !event.canIntercept) return;

			event.intercept({
				handler: async () => {
					// Dispatch a popstate event to notify react-router.
					window.dispatchEvent(new PopStateEvent("popstate"));
				},
				focusReset: "manual",
				scroll: "manual",
			});
		},
		{ signal: controller.signal },
	);
	import.meta.hot?.dispose(() => controller.abort()); // HMR
}
