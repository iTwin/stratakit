/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { readdirSync, readFileSync, writeFile } from "node:fs";
import { join } from "node:path";

const ROOT_DIR = join(import.meta.dirname, "..");
const SVG_ICONS_DIR = join(ROOT_DIR, "icons");

const svgFiles = readdirSync(SVG_ICONS_DIR).filter((f) =>
	f.endsWith("-16.svg"),
);

for (const svgFile of svgFiles) {
	const icon16Src = join(SVG_ICONS_DIR, svgFile);
	const icon24Src = icon16Src.replace("-16.svg", "-24.svg");
	const iconDist = icon16Src.replace("-16.svg", ".svg");

	const icon16Path = getSvgInternals(readFileSync(icon16Src, "utf8"));
	const icon24Path = getSvgInternals(readFileSync(icon24Src, "utf8"));

	const svgContent = `\
<svg xmlns="http://www.w3.org/2000/svg">
  <symbol id="icon" fill="none" viewBox="0 0 16 16">${icon16Path}</symbol>
  <symbol id="icon-large" fill="none" viewBox="0 0 24 24">${icon24Path}</symbol>
  <use href="#icon"/>
</svg>
`;

	writeFile(iconDist, svgContent, "utf8", (err) => {
		if (err) {
			process.exitCode = 1;
			throw err;
		}
		console.log(`${iconDist} created.`);
	});
}

function getSvgInternals(fullSvgContent: string) {
	const svgInternals = fullSvgContent.match(/<svg[^>]*>(.*)<\/svg>/s)?.[1];
	if (!svgInternals) {
		throw new Error("Invalid SVG content");
	}
	return svgInternals.replaceAll("\n  ", "").trim();
}
