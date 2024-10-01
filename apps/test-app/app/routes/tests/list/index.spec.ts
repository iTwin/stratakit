/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { test, expect } from "@playwright/test";

test("default", async ({ page }) => {
	await page.goto("/tests/list");

	const items = page.getByRole("listitem");
	await expect(items).toHaveCount(3);
});

test("visual", async ({ page }) => {
	await page.goto("/tests/list");
	await expect(page.locator("body")).toHaveScreenshot();
});
