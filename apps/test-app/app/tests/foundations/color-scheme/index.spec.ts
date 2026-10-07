/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { expect, test } from "#playwright";

test("@visual", async ({ page }) => {
	await page.goto("/tests/color-scheme");
	const schemes = page.getByTestId("all");
	await expect(schemes).toHaveScreenshot();
});
