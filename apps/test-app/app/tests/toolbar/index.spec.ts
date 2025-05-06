/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { test, expect } from "#playwright";
import AxeBuilder from "@axe-core/playwright";

test("default", async ({ page }) => {
	await page.goto("/tests/toolbar");

	const toolbar = page.getByRole("toolbar");
	await expect(toolbar).toBeVisible();
});

test("keyboard navigation", async ({ page }) => {
	await page.goto("/tests/toolbar");
	const toolbar = page.getByRole("toolbar");
	const items = toolbar.getByRole("button");

	// Focus the toolbar
	await page.keyboard.press("Tab");
	await expect(items.first()).toBeFocused();

	// Arrow keys
	await page.keyboard.press("ArrowRight");
	await expect(items.nth(1)).toBeFocused();
	await page.keyboard.press("ArrowRight");
	await expect(items.nth(2)).toBeFocused();
	await page.keyboard.press("ArrowLeft");
	await expect(items.nth(1)).toBeFocused();
	await page.keyboard.press("ArrowLeft");
	await expect(items.first()).toBeFocused();

	// Home and End keys
	await page.keyboard.press("End");
	await expect(items.last()).toBeFocused();
	await page.keyboard.press("Home");
	await expect(items.first()).toBeFocused();
});

test.describe("@visual", () => {
	test("default", async ({ page }) => {
		await page.goto("/tests/toolbar?visual=true");
		await expect(page.locator("body")).toHaveScreenshot();
	});

	test("forced-colors", async ({ page, browserName }) => {
		test.skip(
			browserName === "webkit",
			"Webkit does not support forced-colors",
		);
		await page.goto("/tests/toolbar?visual=true");
		await page.emulateMedia({ forcedColors: "active" });
		await expect(page.locator("body")).toHaveScreenshot();
	});
});

test.describe("@a11y", () => {
	test("Axe Page Scan", async ({ page }) => {
		await page.goto("/tests/toolbar");
		const axe = new AxeBuilder({ page });
		const accessibilityScan = await axe.analyze();
		expect(accessibilityScan.violations).toEqual([]);
	});
});
