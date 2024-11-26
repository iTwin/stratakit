/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("default", async ({ page }) => {
	await page.goto("/tests/kbd");
	const kbdComponent = page.getByTestId("kbd");
	expect(kbdComponent).not.toBe(null);
});

test("@visual", async ({ page }) => {
	await page.goto("/tests/kbd?visual=true");
	await expect(page.locator("body")).toHaveScreenshot();
});

test("should not be focusable", async ({ page }) => {
	await page.goto("/tests/kbd");

	const kbd = page.getByText("Ctrl");
	await kbd.focus();

	await expect(kbd).not.toBeFocused();
});

test.describe("@a11y", () => {
	test("Axe Page Scan", async ({ page }) => {
		await page.goto("/tests/kbd");

		const kbdComponent = page.getByTestId("kbd");
		await expect(kbdComponent).toBeVisible();

		const axe = new AxeBuilder({ page });
		const accessibilityScan = await axe.analyze();
		expect(accessibilityScan.violations).toEqual([]);
	});
});
