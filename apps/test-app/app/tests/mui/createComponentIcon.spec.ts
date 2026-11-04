/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { expect, test } from "#playwright";

// This file includes tests that validate the behavior of `createComponentIcon` from
// packages/mui/src/Icon.tsx.  None of those components created are  are directly exported from
// @stratakit/mui so they have to be tested indirectly

test("accepts titleAccess prop and converts it to label.", async ({ page }) => {
	await page.goto("/standalone?path=mui/DataGrid.showcase&export=DataTypes");
	const trueCell = page
		.getByRole("row")
		.and(page.locator('[aria-rowindex="2"]'))
		.locator('[data-field="inService"]');
	const falseCell = page
		.getByRole("row")
		.and(page.locator('[aria-rowindex="3"]'))
		.locator('[data-field="inService"]');

	await expect(trueCell).toHaveAccessibleName("yes");
	await expect(falseCell).toHaveAccessibleName("no");
});

test("Does not pass font-size through to SVG element on icons", async ({
	page,
}) => {
	await page.goto("/standalone?path=mui/DataGrid.showcase&export=DataTypes");
	const iconButton = await page.getByRole("button", { name: "Filters" });
	const svg = iconButton.locator("css=svg");
	await expect(svg).not.toHaveAttribute("font-size");
});

test("filters out ownerState", async ({ page }) => {
	await page.goto("/standalone?path=mui/Alert.showcase&export=AlertClose");
	const iconButton = await page.getByRole("button", { name: "Close" });
	const svg = iconButton.locator("css=svg");
	await expect(svg).not.toHaveAttribute("ownerState");
});
