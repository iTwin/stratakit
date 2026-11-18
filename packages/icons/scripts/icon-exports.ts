/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { existsSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT_DIR = join(import.meta.dirname, "..");
const SVG_ICONS_DIR = join(ROOT_DIR, "icons");
const SRC_DIR = join(ROOT_DIR, "src");

function toPascalCase(name: string) {
	return name
		.split(/[-_]/)
		.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
		.join("");
}

const iconNames = readdirSync(SVG_ICONS_DIR).map((f) =>
	f.replace(/\.svg$/, ""),
);

for (const iconName of iconNames) {
	const tsPath = join(SRC_DIR, `${iconName}.ts`);
	if (existsSync(tsPath)) continue;

	const pascal = toPascalCase(iconName);
	const content = `/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import url from "../icons/${iconName}.svg";

export const svg${pascal} = \`\${url}#icon\`;
export const svg${pascal}Large = \`\${url}#icon-large\`;
`;
	writeFileSync(tsPath, content, "utf8");
	console.log(`Created src/${iconName}.ts`);
}
