/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { test, expect } from "#playwright";
import AxeBuilder from "@axe-core/playwright";

test("default", async ({ page }) => {
	await page.goto("/tests/banner");

	const banner = page.locator(".🥝-banner").first();
	await expect(banner).toBeVisible();
});

test("dismiss", async ({ page }) => {
	await page.goto("/tests/banner?dismiss=true");

	const banners = page.locator(".🥝-banner");
	await expect(banners).toHaveCount(3);

	// Dismiss button should not exist
	await expect(banners.nth(0).locator("button")).not.toBeVisible();

	// Dismiss button's accessible name should be "Dismiss Label" since label="Label"
	// regardless of if the label is visually hidden (i=2) or not (i=1).
	for (let i = 1; i < 3; i++) {
		await expect(banners.nth(i).locator("button")).toBeVisible();
		await expect(banners.nth(i).locator("button")).toHaveAccessibleName(
			"Dismiss Label",
		);
	}
});

test.describe("@visual", () => {
	test("default", async ({ page }) => {
		await page.goto("/tests/banner?visual=true");
		await expect(page.locator("body")).toHaveScreenshot();
	});

	test("forced-colors", async ({ page, browserName }) => {
		test.skip(
			browserName === "webkit",
			"Webkit does not support forced-colors",
		);
		await page.goto("/tests/banner?visual=true");
		await page.emulateMedia({ forcedColors: "active" });
		await expect(page.locator("body")).toHaveScreenshot();
	});
});

test.describe("@a11y", () => {
	test("Axe Page Scan", async ({ page }) => {
		await page.goto("/tests/banner");

		const banner = page.locator(".🥝-banner").first();
		await expect(banner).toBeVisible();

		const axe = new AxeBuilder({ page });
		const accessibilityScan = await axe.analyze();
		expect(accessibilityScan.violations).toEqual([]);
	});
});
