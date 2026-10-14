/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import assert from "node:assert/strict";
import { readdir } from "node:fs/promises";
import test from "node:test";
import { fileURLToPath } from "node:url";

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
