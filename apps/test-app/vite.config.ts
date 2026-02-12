/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { reactRouter } from "@react-router/dev/vite";
import * as lightningcss from "lightningcss";
import {
	defaultClientConditions,
	defaultServerConditions,
	defineConfig,
} from "vite";
import babel from "vite-plugin-babel";
import devtoolsJson from "vite-plugin-devtools-json";
import tsconfigPaths from "vite-tsconfig-paths";
import {
	primitivesTransform,
	staticVariablesTransform,
	themeTransform,
	typographyTokensTransform,
	typographyTransform,
} from "internal/lightningcss-visitors.js";

import type { Config as ReactRouterConfig } from "@react-router/dev/config";
import type { Plugin } from "vite";

const isDev = process.env.NODE_ENV === "development";

const { GH_PAGES_URL, BASE_FOLDER } = process.env;

/** Combines the pathname from GH_PAGES_URL with BASE_FOLDER. */
const basename = (() => {
	if (!GH_PAGES_URL) return undefined;

	const sitePathname = GH_PAGES_URL
		? new URL(GH_PAGES_URL).pathname.replace(/\/$/, "")
		: undefined;

	if (!sitePathname && !BASE_FOLDER) return undefined;

	// basename must start with "/" AND end with "/".
	return `${[sitePathname, BASE_FOLDER].join("/")}/`;
})();

const customConditions = isDev ? ["@stratakit/source"] : [];

// https://reactrouter.com/explanation/special-files#react-routerconfigts
export const reactRouterConfig = {
	...(basename && { basename }),
	ssr: false,
	prerender: true,
} satisfies ReactRouterConfig;

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		reactRouter(),
		babel({
			filter: /\.[jt]sx?$/,
			babelConfig: {
				presets: ["@babel/preset-typescript"],
				plugins: [["babel-plugin-react-compiler", {}]],
			},
		}),
		tsconfigPaths(),
		bundleCssPlugin(),
		devtoolsJson(),
	],
	build: {
		assetsInlineLimit: (filePath) => {
			if (filePath.endsWith(".svg")) return false;
			return undefined;
		},
		// assetsDir must not start with "/".
		assetsDir: basename ? `${basename.replace(/^\//, "")}/assets` : "assets",
	},
	server: {
		port: 1800, // dev server port
		warmup: { clientFiles: ["./app/root.tsx"] }, // https://github.com/remix-run/react-router/issues/12786#issuecomment-2634033513
	},
	preview: {
		port: 1800, // prod server port
	},
	resolve: {
		conditions: [customConditions, defaultClientConditions].flat(),
	},
	ssr: {
		resolve: {
			conditions: [customConditions, defaultServerConditions].flat(),
		},
	},
	define: {
		__VERSION__: `"development"`,
	},
});

/** Vite plugin that bundles "*.css?inline" files using lightningcss. Only used during dev. */
function bundleCssPlugin() {
	let isDev = false;

	return {
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
				exclude: lightningcss.Features.Colors,
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
	} satisfies Plugin;
}
