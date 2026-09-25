/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { expect, test } from "#playwright";

test("adds padding for secondary action", async ({ page }) => {
	await page.goto(
		"/showcase?path=mui/List.showcase&export=SecondaryActionPadding",
	);

	const list = page.getByTestId("list").first();
	await expect(list).toHaveScreenshot();
});
