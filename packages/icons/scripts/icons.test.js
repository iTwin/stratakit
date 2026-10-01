/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import assert from "node:assert/strict";
import { readdir } from "node:fs/promises";
import test from "node:test";
import { fileURLToPath } from "node:url";

import iconsMeta from "../icons-meta.json" with { type: "json" };

const ICONS_DIR = fileURLToPath(new URL("../icons", import.meta.url));
const SRC_DIR = fileURLToPath(new URL("../src", import.meta.url));

test("every SVG has a matching TS module", async () => {
	const actual = await readdir(SRC_DIR);
	const expected = (await readdir(ICONS_DIR))
		.filter((file) => file.endsWith(".svg"))
		.map((file) => file.replace(/\.svg$/, ".ts"));

	assert.deepEqual(
		actual.toSorted(),
		expected.toSorted(),
		"Mismatch between `.svg` files and corresponding `.ts` modules.",
	);
});

test("every SVG has meta data", async () => {
	const iconMetaKeys = Object.keys(iconsMeta);

	const icons = (await readdir(ICONS_DIR)).map((icon) =>
		icon.replace(/\.svg$/, ""),
	);

	const redundantMetaIcons = iconMetaKeys.filter(
		(metaIcon) => !icons.includes(metaIcon),
	);
	assert.deepEqual(redundantMetaIcons, [], "Redundant meta data found");

	const iconsWithoutMeta = icons.filter((icon) => !iconsMeta[icon]);
	assert.deepEqual(iconsWithoutMeta, [], "Icons without meta data found");

	const iconsWithoutAliases = icons.filter((icon) => {
		const iconMeta = iconsMeta[icon];
		return (
			!iconMeta ||
			!Array.isArray(iconMeta.aliases) ||
			iconMeta.aliases.length === 0
		);
	});
	assert.deepEqual(iconsWithoutAliases, [], "Icons without aliases found");
});
