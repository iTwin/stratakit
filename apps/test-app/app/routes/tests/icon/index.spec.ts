/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("default", async ({ page }) => {
	await page.goto("/tests/icon");

	const icon = page.locator("svg");
	await expect(icon).toHaveAttribute("aria-hidden", "true");
});

test.describe("@visual", () => {
	test("default", async ({ page }) => {
		await page.goto("/tests/icon");
		await expect(page.locator("body")).toHaveScreenshot();
	});

	test("large", async ({ page }) => {
		await page.goto("/tests/icon?size=large");
		await expect(page.locator("body")).toHaveScreenshot();
	});

	test("render prop", async ({ page }) => {
		await page.goto("/tests/icon?renderProp=true");
		await expect(page.locator("body")).toHaveScreenshot();
	});
});

test.describe("@a11y", () => {
	test("Axe Page Scan", async ({ page }) => {
		await page.goto("/tests/icon");

		const icon = page.locator("svg");
		await expect(icon).toBeVisible();

		const axe = new AxeBuilder({ page });
		const accessibilityScan = await axe.analyze();
		expect(accessibilityScan.violations).toEqual([]);
	});
});
