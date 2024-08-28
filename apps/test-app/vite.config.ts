/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig, type Plugin } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import * as esbuild from "esbuild";
import { createRoutesFromFolders } from "@remix-run/v1-route-convention";

const basename = `/${process.env.BASE_FOLDER}/` || "";

export default defineConfig({
	base: basename,
	plugins: [
		remix({
			basename,
			future: {
				v3_fetcherPersist: true,
				v3_relativeSplatPath: true,
				v3_throwAbortReason: true,
			},
			ignoredRouteFiles: ["**/*"], // Ignore default Remix v2 file conventions.
			routes: (defineRoutes) => {
				// `createRoutesFromFolders` will follow the Remix v1 route convention.
				// See https://remix.run/docs/en/v1/file-conventions/routes-files
				return createRoutesFromFolders(defineRoutes, {
					ignoredFilePatterns: ["**/*.spec.*", "**/.DS_Store"],
				});
			},
			ssr: false, // SPA mode for github-pages
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
			if (!id.endsWith(".css?inline")) return;

			const result = await esbuild.build({
				entryPoints: [id.replace(/\?inline$/, "")],
				bundle: true,
				write: false,
				minify: true,
				target: ["chrome110", "firefox110", "safari16"],
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
