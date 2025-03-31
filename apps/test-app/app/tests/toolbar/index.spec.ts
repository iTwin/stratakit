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

test.describe("@a11y", () => {
	test("Axe Page Scan", async ({ page }) => {
		await page.goto("/tests/toolbar");
		const axe = new AxeBuilder({ page });
		const accessibilityScan = await axe.analyze();
		expect(accessibilityScan.violations).toEqual([]);
	});
});
