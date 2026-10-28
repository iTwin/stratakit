/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import assert from "node:assert/strict";
import test from "node:test";

import dark from "./theme-dark.json" with { type: "json" };
import light from "./theme-light.json" with { type: "json" };

test("light and dark themes have the same keys", () => {
	function nestedKeys(object) {
		return Object.entries(object).flatMap(([key, value]) => {
			if ("$value" in value) return [key];
			return nestedKeys(value).map((path) => `${key}.${path}`);
		});
	}

	assert.deepEqual(nestedKeys(light).sort(), nestedKeys(dark).sort());
});
