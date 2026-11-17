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
	const modulesWithoutIcons = [
		"add-region.ts",
		"collapse-rows-all.ts",
		"collapse-rows.ts",
		"define-region-size.ts",
		"delete-columns.ts",
		"delete-rows.ts",
		"delete-table.ts",
		"expand-rows-all.ts",
		"expand-rows.ts",
		"gesture-one-finger-double-tap.ts",
		"gesture-one-finger-drag.ts",
		"gesture-one-finger-tap.ts",
		"gesture-two-finger-drag.ts",
		"gesture-two-finger-tap.ts",
		"graph-scatter-chart.ts",
		"imodel-problematic-sync.ts",
		"merge-cells.ts",
		"pipe-sewer.ts",
		"pipe-water.ts",
		"portable-water-pipes.ts",
		"profile.ts",
		"rule-delta-create.ts",
		"rule-slope-create.ts",
		"sewage-pipes.ts",
		"split-cells.ts",
		"storm-water-pipes.ts",
		"table-column-insert-right.ts",
		"table-row-insert-below.ts",
		"vertex-mesh-add.ts",
		"vertex-mesh-control.ts",
	];

	const actual = (await readdir(SRC_DIR)).filter(
		(file) => !modulesWithoutIcons.includes(file),
	);
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

	const iconsWithoutSymbols = icons.filter((icon) => {
		const iconMeta = iconsMeta[icon];
		return (
			!iconMeta ||
			!Array.isArray(iconMeta.symbols) ||
			iconMeta.symbols.length === 0
		);
	});
	assert.deepEqual(iconsWithoutSymbols, [], "Icons without symbols found");
});
