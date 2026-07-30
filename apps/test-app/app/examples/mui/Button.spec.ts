/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { expect, test } from "#playwright";

test.describe("@visual", () => {
	test("variants", async ({ page }) => {
		await page.goto("/examples/mui/Button.variants");
		await expect(page.locator("body")).toHaveScreenshot();
	});

	test("icon", async ({ page }) => {
		await page.goto("/examples/mui/Button.icon");
		await expect(page.locator("body")).toHaveScreenshot();
	});

	test("forced-colors", async ({ page }) => {
		await page.goto("/examples/mui/Button.variants");
		await page.emulateMedia({ forcedColors: "active" });
		await expect(page.locator("body")).toHaveScreenshot();

		await page.goto("/examples/mui/Button.icon");
		await expect(page.locator("body")).toHaveScreenshot();
	});
});
