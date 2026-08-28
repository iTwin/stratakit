/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { expect, test } from "#playwright";
import { propCombinations } from "./VaryProps.tsx";

test("propCombinations varies later props  while keeping the earlier constant", () => {
	const combinations = propCombinations({
		a: [true, false],
		b: [1, 2],
		c: ["primary", "secondary"],
	});
	expect(combinations).toEqual([
		{ a: true, b: 1, c: "primary" },
		{ a: true, b: 1, c: "secondary" },
		{ a: true, b: 2, c: "primary" },
		{ a: true, b: 2, c: "secondary" },
		{ a: false, b: 1, c: "primary" },
		{ a: false, b: 1, c: "secondary" },
		{ a: false, b: 2, c: "primary" },
		{ a: false, b: 2, c: "secondary" },
	]);
});
