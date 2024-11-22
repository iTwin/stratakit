/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as path from "node:path";
import * as esbuild from "esbuild";
import * as lightningcss from "lightningcss";
import fg from "fast-glob";
import {
	primitivesTransform,
	themeTransform,
	staticVariablesTransform,
	typographyTransform,
} from "internal/visitors.js";

const isDev = process.env.NODE_ENV === "development";

const entryPoints = await fg("src/**/*.{ts,tsx}", {
	onlyFiles: true,
	ignore: ["**/*.d.ts"],
});

await esbuild.build({
	entryPoints,
	entryNames: "[dir]/[name]",
	outbase: "src",
	outdir: isDev ? "dist/DEV" : "dist",
	bundle: false,
	format: "esm",
	jsx: "automatic",
	target: "es2021",
	...(!isDev && { dropLabels: ["DEV"] }),
});

// Run esbuild again, only to inline bundled CSS inside `.css.ts` files
await esbuild.build({
	entryPoints: await fg("src/**/*.css.ts", { onlyFiles: true }),
	entryNames: "[dir]/[name]",
	outbase: "src",
	outdir: isDev ? "dist/DEV" : "dist",
	bundle: true,
	format: "esm",
	jsx: "automatic",
	target: "es2021",
	plugins: [inlineCssPlugin()],
});

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
function inlineCssPlugin() {
	return /** @type {esbuild.Plugin} */ ({
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
				const visitor = lightningcss.composeVisitors([
					primitivesTransform(),
					themeTransform(),
					typographyTransform(),
					staticVariablesTransform(),
				]);

				// Process the CSS file using lightningcss for bundling and other transformations.
				const { code: intermediateCode } = await lightningcss.bundleAsync({
					filename: args.path,
					visitor,
				});

				// Process the bundled CSS again, for minification and any leftover transformations.
				const { code: finalCode } = lightningcss.transform({
					filename: args.path,
					code: intermediateCode,
					minify: true,
					targets: {
						chrome: (110 << 16) | (0 << 8), // chrome 110.0
						firefox: (110 << 16) | (0 << 8), // firefox 110.0
						safari: (16 << 16) | (4 << 8), // safari 16.4
					},
					visitor,
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
