/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("default", async ({ page }) => {
	await page.goto("/tests/kbd");
	const kbdComponent = page.getByText("Ctrl");
	expect(await kbdComponent.evaluate((e) => e.localName)).toBe("kbd");
	await expect(kbdComponent).toBeVisible();
});

test.describe("@visual", () => {
	test("default visual snapshot", async ({ page }) => {
		await page.goto("/tests/kbd?visual=true");
		await expect(page.locator("body")).toHaveScreenshot();
	});

	test("visual KbdKeys snapshot", async ({ page }) => {
		await page.goto("/tests/kbd?kbdkeys=true");
		await expect(page.locator("body")).toHaveScreenshot();
	});
});

test.describe("@a11y", () => {
	test("Axe Page Scan", async ({ page }) => {
		await page.goto("/tests/kbd");

		const kbdComponent = page.getByText("Ctrl");
		await expect(kbdComponent).toBeVisible();

		const axe = new AxeBuilder({ page });
		const accessibilityScan = await axe.analyze();
		expect(accessibilityScan.violations).toEqual([]);
	});
});
