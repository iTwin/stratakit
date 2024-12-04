/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { reactRouter } from "@react-router/dev/vite";
import { defineConfig, type Plugin, defaultClientConditions } from "vite";
import type { Config as ReactRouterConfig } from "@react-router/dev/config";
import tsconfigPaths from "vite-tsconfig-paths";
import * as lightningcss from "lightningcss";
import {
	primitivesTransform,
	themeTransform,
	typographyTokensTransform,
	staticVariablesTransform,
	typographyTransform,
} from "internal/visitors.js";

const isDev = process.env.NODE_ENV === "development";

const basename = process.env.BASE_FOLDER
	? `/${process.env.BASE_FOLDER}/`
	: undefined;

// https://reactrouter.com/explanation/special-files#react-routerconfigts
export const reactRouterConfig = {
	...(basename && { basename }),
	ssr: false,
	prerender: true,
} satisfies ReactRouterConfig;

// https://vite.dev/config/
export default defineConfig({
	plugins: [reactRouter(), tsconfigPaths(), bundleCssPlugin()],
	build: {
		assetsInlineLimit: (filePath) => {
			if (filePath.includes("kiwi-icons/icons")) return false;
			return undefined;
		},
		assetsDir: process.env.BASE_FOLDER
			? `${process.env.BASE_FOLDER}/assets`
			: "assets",
	},
	server: {
		port: 1800, // dev server port
	},
	preview: {
		port: 1800, // prod server port
	},
	resolve: {
		conditions: [isDev ? ["@kiwi/source"] : [], defaultClientConditions].flat(),
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

			const filename = id.replace(/\?inline$/, "");

			const visitor = lightningcss.composeVisitors([
				primitivesTransform(),
				themeTransform(),
				typographyTransform(),
				typographyTokensTransform(),
				staticVariablesTransform(),
			]);

			const { code: finalCode } = lightningcss.transform({
				filename,
				code: (await lightningcss.bundleAsync({ filename, visitor })).code,
				minify: true,
				targets: {
					chrome: (110 << 16) | (0 << 8), // chrome 110.0
					firefox: (110 << 16) | (0 << 8), // firefox 110.0
					safari: (16 << 16) | (4 << 8), // safari 16.4
				},
				visitor,
			});

			return { code: finalCode.toString().trim() };
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
