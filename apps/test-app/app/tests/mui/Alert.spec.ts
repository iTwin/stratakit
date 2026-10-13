/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { expect, test } from "#playwright";

test("showcase", { tag: "@visual" }, async ({ page }) => {
	await page.goto("/showcase?path=mui/Alert.showcase");
	await expect(page).toHaveScreenshot();
});
