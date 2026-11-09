/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { randomUUID } from "crypto";

import { expect, test } from "#playwright";

test.use({ baseURL: "http://localhost:1800/standalone" });

test("converts titleAccess to label", async ({ mount }) => {
	const label = randomUUID();
	const root = await mount("tests/mui/Icon.fixture", {
		titleAccess: label,
	});
	await expect(root.getByRole("img")).toHaveAccessibleName(label);
});
