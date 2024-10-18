/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { test, expect } from "@playwright/test";

test("@visual", async ({ page }) => {
	await page.goto("/tests/text-field?visual=true");
	await expect(page.locator("body")).toHaveScreenshot();
});
