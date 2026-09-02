/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as fs from "node:fs/promises";
import * as path from "node:path";

import * as babel from "@babel/core";
import * as lightningcss from "lightningcss";
import {
	createVisitor,
	customAtRules,
	resolver,
	targets,
} from "./lightningcss.js";

/**
 * This plugin inlines the contents of a CSS file as a JavaScript string when the
 * CSS file is imported with the `?inline` query param (similar to [Vite](https://vitejs.dev/guide/features.html#disabling-css-injection-into-the-page)).
 * It also bundles, minifies, and does syntax-lowering on the CSS file using lightningcss.
 *
 * Input:
 * ```css
 * button {
 *   span {
 *     user-select: none;
 *   }
 * }
 * ```
 * ```js
 * import css from "./styles.css?inline";
 * ```
 *
 * Output:
 * ```js
 * const css = String.raw`button span{-webkit-user-select:none;user-select:none}`;
 * ```
 */
export function inlineCssPlugin() {
	return /** @type {import("esbuild").Plugin} */ ({
		name: "inline-css",

		setup({ onResolve, onLoad }) {
			onResolve({ filter: /.*/ }, (args) => {
				if (args.kind !== "import-statement") return;

				if (args.path.endsWith(".css?inline")) {
					return {
						path: path.join(args.resolveDir, args.path.replace("?inline", "")),
						namespace: "inline-css",
					};
				}

				// Externalize anything that is not a .css?inline file
				return { path: args.path, external: true };
			});

			onLoad({ filter: /.*/, namespace: "inline-css" }, async (args) => {
				// Process the CSS file using lightningcss for bundling and other transformations.
				const { code: intermediateCode } = await lightningcss.bundleAsync({
					filename: args.path,
					visitor: createVisitor(),
					customAtRules,
					resolver,
					exclude: lightningcss.Features.Colors,
				});

				// Process the bundled CSS again, for minification and any leftover transformations.
				const { code: finalCode } = lightningcss.transform({
					filename: args.path,
					code: intermediateCode,
					minify: true,
					customAtRules,
					targets,
					visitor: createVisitor(),
					exclude: lightningcss.Features.Colors,
				});
				const css = finalCode.toString().trim();

				return {
					contents: `export default String.raw\`${css}\`;`,
					loader: "js",
				};
			});
		},
	});
}

/**
 * This plugin transforms React code using `babel-plugin-react-compiler`. Should be used in production builds for auto-memoization.
 */
export function reactCompilerPlugin() {
	return /** @type {import("esbuild").Plugin} */ ({
		name: "react-compiler",

		setup({ onLoad }) {
			onLoad({ filter: /\.js$/ }, async (args) => {
				const source = await fs.readFile(args.path, "utf8");
				const result = await babel.transformAsync(source, {
					filename: args.path,
					plugins: [["babel-plugin-react-compiler", { target: "18" }]],
					sourceMaps: false,
					configFile: false,
					babelrc: false,
				});
				if (!result?.code)
					throw new Error(`Babel transform failed for file: ${args.path}`, {
						cause: result,
					});

				return {
					contents: result.code,
					loader: path.extname(args.path).slice(1),
				};
			});
		},
	});
}
