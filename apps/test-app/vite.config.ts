/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig, type Plugin } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import * as lightningcss from "lightningcss";
import { createRoutesFromFolders } from "@remix-run/v1-route-convention";
import {
	primitivesTransform,
	staticVariablesTransform,
} from "internal/visitors.js";

const basename = process.env.BASE_FOLDER
	? `/${process.env.BASE_FOLDER}/`
	: undefined;

export default defineConfig({
	...(basename && { base: basename }),
	plugins: [
		remix({
			...(basename && { basename }),
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
					ignoredFilePatterns: ["**/*.spec.*", "**/*.css", "**/.DS_Store"],
				});
			},
			ssr: false, // SPA mode for github-pages
		}),
		tsconfigPaths(),
		esbuildBundleCss(),
	],
	build: {
		assetsInlineLimit: (filePath) => {
			if (filePath.includes("kiwi-icons/icons")) return false;
			return undefined;
		},
	},
	server: {
		port: 1800, // dev server port
	},
	preview: {
		port: 1800, // prod server port
	},
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

			const { code } = await lightningcss.bundleAsync({
				filename: id.replace(/\?inline$/, ""),
				minify: true,
				targets: {
					chrome: (110 << 16) | (0 << 8), // chrome 110.0
					firefox: (110 << 16) | (0 << 8), // firefox 110.0
					safari: (16 << 16) | (4 << 8), // safari 16.4
				},
				visitor: lightningcss.composeVisitors([
					primitivesTransform(),
					staticVariablesTransform(),
				]),
			});

			return { code: code.toString().trim() };
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
