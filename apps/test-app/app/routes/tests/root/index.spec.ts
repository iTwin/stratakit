/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { test, expect } from "@playwright/test";

test("default", async ({ page }) => {
	await page.goto("/tests/root", { waitUntil: "domcontentloaded" });
	await expect(page.locator("h1")).toHaveText("Root");
	await expect(page.locator("body")).toHaveScreenshot("shadow.png");

	const popoutPromise = page.waitForEvent("popup");
	await page.getByRole("button", { name: "Open popout" }).click();
	const popout = await popoutPromise;
	await popout.waitForLoadState("domcontentloaded");
	await expect(popout.locator("body")).toHaveScreenshot("popout.png");
});
