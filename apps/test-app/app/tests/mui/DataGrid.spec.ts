/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { expect, test } from "#playwright";

test("Includes accessible text for Boolean columns", async ({ page }) => {
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
