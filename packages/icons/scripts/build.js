/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as esbuild from "esbuild";
import fg from "fast-glob";

await esbuild.build({
	entryPoints: await fg("src/**/*.ts", { ignore: ["**/*.d.ts"] }),
	entryNames: "[dir]/[name]",
	outbase: "src",
	outdir: "dist",
	bundle: false,
	format: "esm",
	target: "es2021",
});
