/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as esbuild from "esbuild";
import fg from "fast-glob";
import {
	inlineCssPlugin,
	reactCompilerPlugin,
} from "internal/esbuild-plugins.js";

import meta from "../package.json" with { type: "json" };

const isDev = process.env.NODE_ENV === "development";

const entryPoints = await fg("src/**/*.{ts,tsx}", {
	onlyFiles: true,
	ignore: [
		"**/*.d.ts",
		"**/types.ts", // This will be used for generating a `types.d.ts` file only.
	],
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
	define: {
		__VERSION__: `"${meta.version}"`,
	},
	...(!isDev && { dropLabels: ["DEV"] }),
});

// For production builds, run esbuild again with React Compiler.
if (!isDev) {
	await esbuild.build({
		entryPoints: await fg("dist/**/*.js", {
			onlyFiles: true,
			ignore: ["dist/DEV"],
		}),
		entryNames: "[dir]/[name]",
		outdir: "dist",
		bundle: false,
		format: "esm",
		jsx: "automatic",
		target: "es2021",
		plugins: [reactCompilerPlugin()],
		allowOverwrite: true,
	});
}

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
