/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as path from "node:path";
import * as esbuild from "esbuild";
import fg from "fast-glob";

const entryPoints = await fg("src/**/*.{ts,tsx}", {
	onlyFiles: true,
	ignore: ["**/*.d.ts"],
});

await esbuild.build({
	entryPoints,
	entryNames: "[dir]/[name]",
	outbase: "src",
	outdir: "dist",
	bundle: true,
	format: "esm",
	jsx: "automatic",
	target: "es2021",
	plugins: [inlineCssPlugin()],
});

function inlineCssPlugin() {
	return /** @type {esbuild.Plugin} */ ({
		name: "inline-css",

		setup({ onResolve, onLoad, esbuild }) {
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
				// Feed the CSS file back into esbuild to bundle and minify it
				const result = await esbuild.build({
					entryPoints: [args.path],
					bundle: true,
					write: false,
					minify: true,
				});

				const css = result.outputFiles[0].text;

				return {
					contents: `export default String.raw\`${css.trim()}\`;`,
					loader: "js",
				};
			});
		},
	});
}
