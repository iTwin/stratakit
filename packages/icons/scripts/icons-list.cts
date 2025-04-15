/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { readdirSync, writeFile } from "node:fs";
import { join } from "node:path";

const ROOT_DIR = join(__dirname, "..");
const SVG_ICONS_DIR = join(ROOT_DIR, "icons");
const ICONS_LIST_PATH = join(ROOT_DIR, "icons-list.json");

const svgFiles = readdirSync(SVG_ICONS_DIR).filter(
	(f) => !f.endsWith("-large.svg"),
);
writeFile(
	ICONS_LIST_PATH,
	JSON.stringify(svgFiles.map((f) => f.replace(SVG_ICONS_DIR, ""))),
	"utf8",
	(err) => {
		if (err) {
			process.exitCode = 1;
			throw err;
		}
		console.log("icons-list.json created.");
	},
);
