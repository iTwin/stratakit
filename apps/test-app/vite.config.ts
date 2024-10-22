/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { reactRouter } from "@react-router/dev/vite";
import { defineConfig, type Plugin } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import * as lightningcss from "lightningcss";
import {
	primitivesTransform,
	themeTransform,
	staticVariablesTransform,
} from "internal/visitors.js";

const basename = process.env.BASE_FOLDER
	? `/${process.env.BASE_FOLDER}/`
	: undefined;

export default defineConfig({
	...(basename && { base: basename }),
	plugins: [
		reactRouter({
			ssr: false, // SPA mode for github-pages
			prerender: true, // prerendering for github-pages
		}),
		tsconfigPaths(),
		bundleCssPlugin(),
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

/** Vite plugin that bundles "*.css?inline" files using lightningcss. Only used during dev. */
function bundleCssPlugin() {
	let isDev = false;

	return <Plugin>{
		name: "bundle-css",

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
					themeTransform(),
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
