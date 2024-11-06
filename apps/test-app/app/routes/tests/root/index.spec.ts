/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

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

test.describe("@a11y", () => {
	test("Axe Page Scan", async ({ page }) => {
		await page.goto("/tests/root");

		const axe = new AxeBuilder({ page });
		const accessibilityScan = await axe.analyze();
		expect(accessibilityScan.violations).toEqual([]);
	});
});
