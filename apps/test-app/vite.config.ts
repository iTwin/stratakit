/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig, type Plugin } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import * as esbuild from "esbuild";

export default defineConfig({
	plugins: [
		remix({
			future: {
				v3_fetcherPersist: true,
				v3_relativeSplatPath: true,
				v3_throwAbortReason: true,
			},
			ignoredRouteFiles: ["**/*.spec.*"],
		}),
		tsconfigPaths(),
		esbuildBundleCss(),
	],
});

/** Bundles "*.css?inline" files using esbuild. Only used during dev. */
function esbuildBundleCss() {
	let isDev = false;

	return <Plugin>{
		name: "esbuild-bundle-css",

		configResolved({ command }) {
			isDev = command === "serve";
		},

		async transform(_, id) {
			if (!isDev) return;
			if (!/\.css\?inline$/.test(id)) {
				return;
			}
			const result = esbuild.buildSync({
				write: false,
				bundle: true,
				entryPoints: [id.replace(/\?inline$/, "")],
				minify: true,
			});
			return { code: result.outputFiles[0].text };
		},

		handleHotUpdate({ server, modules }) {
			// Reload the page when CSS changes.
			if (modules.some((mod) => mod.url?.endsWith(".css"))) {
				server.ws.send({ type: "full-reload" });
				return [];
			}
			return modules;
		},
	};
}
