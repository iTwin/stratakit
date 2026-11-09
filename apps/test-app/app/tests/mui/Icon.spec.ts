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

test("does not pass font-size through to SVG element on icons", async ({
	mount,
}) => {
	const root = await mount("tests/mui/Icon.fixture", {
		fontSize: "small",
	});
	const svg = root.locator("css=svg");
	await expect(svg).not.toHaveAttribute("font-size");
});

test("filters out ownerState", async ({ mount }) => {
	const root = await mount("tests/mui/Icon.fixture", {
		ownerState: { error: true },
	});
	const svg = root.locator("css=svg");
	await expect(svg).not.toHaveAttribute("ownerState");
});
