/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { expect, test } from "#playwright";

test.use({ baseURL: "http://localhost:1800/standalone" });

test("shows focus editing caret in editable cells", {
	tag: "@visual-2",
}, async ({ mount }) => {
	const grid = await mount("mui/DataGrid.showcase#DataTypes");
	const editableCell = grid
		.getByRole("gridcell", { name: "Engineering" })
		.first();
	await expect(editableCell).toBeVisible();
	await editableCell.focus();
	await expect(editableCell).toHaveScreenshot();
});

test("does not shows focus editing caret in non-editable cells", {
	tag: "@visual-2",
}, async ({ mount }) => {
	const grid = await mount("mui/DataGrid.showcase#DataTypes");
	const cell = grid.getByRole("gridcell", { name: "1001" }).first();
	await expect(cell).toBeVisible();
	await cell.focus();
	await expect(cell).toHaveScreenshot();
});
