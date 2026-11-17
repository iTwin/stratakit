/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { expect, test } from "#playwright";

test.use({ baseURL: "http://localhost:1800/standalone" });

test("shows edit icon in focused and hovered cells that are editable", async ({
	mount,
}) => {
	const grid = await mount("mui/DataGrid.showcase#DataTypes");
	await grid.getByRole("gridcell", { name: "Engineering" }).first().focus();
	await grid
		.getByRole("gridcell", {
			name: "Dell Precision 7680",
		})
		.first()
		.hover();
	await expect(grid).toHaveScreenshot();
});
