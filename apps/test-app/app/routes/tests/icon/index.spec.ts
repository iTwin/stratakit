/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { test, expect } from "@playwright/test";

test("default", async ({ page }) => {
	await page.goto("/tests/icon");
	await expect(page.locator("body")).toHaveScreenshot();
});

test("large", async ({ page }) => {
	await page.goto("/tests/icon?size=large");
	await expect(page.locator("body")).toHaveScreenshot();
});
