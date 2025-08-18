/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as esbuild from "esbuild";
import fg from "fast-glob";

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
