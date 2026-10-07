/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { writeFileSync } from "node:fs";
import { join } from "node:path";

import iconsList from "../icons-list.json" with { type: "json" };

const ROOT_DIR = join(import.meta.dirname, "..");
const ICONS_META_PATH = join(ROOT_DIR, "icons-meta.json");

const FIGMA_FILE_KEY = process.env.FIGMA_FILE_KEY;
const FIGMA_TOKEN = process.env.FIGMA_TOKEN;

if (!FIGMA_FILE_KEY) {
	throw new Error(
		"Missing FIGMA_FILE_KEY environment variable. https://www.figma.com/design/:FIGMA_FILE_KEY/",
	);
}
if (!FIGMA_TOKEN) {
	throw new Error(
		"Missing FIGMA_TOKEN environment variable. See https://developers.figma.com/docs/rest-api/personal-access-tokens/",
	);
}

const iconNameToComponentSetName: { [key: string]: string } = {
	"chevron-left-double": "chevrons-left",
	"chevron-right-double": "chevrons-right",
	"collapse-rows-all": "rows-collapse-all",
	"collapse-rows": "rows-collapse",
	"expand-rows-all": "rows-expand-all",
	"expand-rows": "rows-expand",
	"filetype-txt-2": "filetype-txt_2",
	"portable-water-pipes": "pipes-water-portable",
	profile: "user-profile",
	"sewage-pipes": "pipes-sewage",
	"storm-water-pipes": "pipes-water-storm",
};

const componentSetOverrides: FigmaComponentSet[] = [
	{
		name: "spring-area",
		description:
			"spring-area [support, flexible, elastic, surface, soil, foundation, mesh]",
	},
	{
		name: "filetype-system",
		description: "filetype-system [file, format]",
	},
	{
		name: "filetype-text",
		description:
			"filetype-text [file, format, txt, text, document, plain text, notes, writing, read, edit]",
	},
	{
		name: "license-minus",
		description: "license-minus [permission, software]",
	},
];

interface IconMeta {
	aliases: string[];
}

interface Meta {
	[key: string]: IconMeta;
}

const meta: Meta = iconsList.reduce((acc, icon) => {
	const iconName = icon.replace(/\.svg$/, "");
	acc[iconName] = { aliases: [] };
	return acc;
}, {} as Meta);

const componentSets = await fetchComponentSets();
for (const icon of iconsList) {
	const iconName = icon.replace(/\.svg$/, "");
	const componentSetName = iconNameToComponentSetName[iconName] ?? iconName;
	const componentSet = [
		...componentSetOverrides,
		...componentSets.meta.component_sets,
	].find((cs) => cs.name === componentSetName && cs.description);
	if (!componentSet) {
		console.warn(`Figma component_set not found for icon: ${iconName}`);
		continue;
	}

	const aliases = parseAliases(componentSet.description);
	meta[iconName].aliases = aliases;
}

writeFileSync(ICONS_META_PATH, JSON.stringify(meta, null, "\t"));

interface FigmaComponentSet {
	name: string;
	description: string;
}

/**
 * Fetches component sets. See https://developers.figma.com/docs/rest-api/component-endpoints/#get-file-component-sets-endpoint
 */
async function fetchComponentSets() {
	interface FigmaFileComponentSetsResponse {
		meta: {
			component_sets: FigmaComponentSet[];
		};
	}

	const response = await fetch(
		`https://api.figma.com/v1/files/${FIGMA_FILE_KEY}/component_sets`,
		{ headers: { "X-Figma-Token": FIGMA_TOKEN as string } },
	);
	const data = await response.json();
	return data as FigmaFileComponentSetsResponse;
}

/**
 * Parses icon aliases from a description field. E.g. `text-align-right [font, typeface, typography, align, position, arrange, right, format, end]`
 */
function parseAliases(description: string): string[] {
	const start = description.indexOf("[");
	const end = description.lastIndexOf("]");
	if (start === -1 || end === -1 || end < start) return [];

	const aliasesStr = description.slice(start + 1, end);
	return aliasesStr
		.split(",")
		.map((alias) => alias.trim())
		.filter(Boolean);
}
