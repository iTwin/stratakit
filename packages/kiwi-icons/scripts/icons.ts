/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { readdirSync, writeFile, readFileSync } from "node:fs";
import { join, basename } from "node:path";
import { load } from "cheerio";

const ROOT_DIR = join(__dirname, "..");
const SVG_ICONS_DIR = join(ROOT_DIR, "svg-icons");
const ICONS_DIR = join(ROOT_DIR, "icons");

const allSvgFiles = readdirSync(SVG_ICONS_DIR);
const svgFiles = allSvgFiles.filter((f) => !f.endsWith("-large.svg"));

for (const svg of svgFiles) {
	const sprite = toSymbolSprite(svg);
	const spritePath = join(ICONS_DIR, svg);
	writeFile(spritePath, sprite, "utf-8", () => {});
}

function findLargeSvg(svg: string) {
	const svgName = basename(svg, ".svg");
	return allSvgFiles.find((s) => s === `${svgName}-large.svg`);
}

function readSvg(svg: string) {
	if (!svg) return "";
	const svgPath = join(SVG_ICONS_DIR, svg);
	return readFileSync(svgPath, "utf-8");
}

function toSymbol(svg: string, id: string) {
	const svgContent = readSvg(svg);

	const $ = load(svgContent, { xml: true });
	const viewBox = $("svg").attr("viewBox");
	const contents = $("svg").contents();
	$("svg").replaceWith(contents);
	$.root().wrapInner("<symbol></symbol>");

	$("symbol").attr("id", id);
	if (viewBox) {
		$("symbol").attr("viewBox", viewBox);
	}
	return $.xml();
}

function toSymbolSprite(svg: string) {
	const symbol = toSymbol(svg, "icon");

	const $ = load(`<svg xmlns="http://www.w3.org/2000/svg" />`, { xml: true });
	$("svg").append(symbol);

	const largeSvg = findLargeSvg(svg);
	if (largeSvg) {
		const largeSymbol = toSymbol(largeSvg, "icon-large");
		$("svg").append(largeSymbol);
	}

	$("svg").append(`<use href="#icon" />`);
	return $.xml();
}
