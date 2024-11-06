/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("default", async ({ page }) => {
	await page.goto("/tests/anchor");

	const anchor = page.getByRole("link");
	const main = page.getByRole("main");

	await expect(anchor).toHaveAccessibleName("Hello");

	await page.keyboard.press("Tab");
	await expect(anchor).toBeFocused();

	// clicking a fragment link moves focus to the target element
	await page.keyboard.press("Enter");
	await expect(main).toBeFocused();
});

test("disabled", async ({ page }) => {
	await page.goto("/tests/anchor?disabled=true");

	const anchor = page.getByRole("link");
	const main = page.getByRole("main");

	await expect(anchor).toHaveAccessibleName("Hello");
	await expect(anchor).toBeDisabled();

	await page.keyboard.press("Tab");
	await expect(anchor).toBeFocused();

	// disabled anchor should not navigate
	await page.keyboard.press("Enter");
	await expect(main).not.toBeFocused();
	await anchor.click({ force: true });
	await expect(main).not.toBeFocused();
	await expect(anchor).toBeFocused();
});

test("@visual", async ({ page }) => {
	await page.goto("/tests/anchor?visual=true");
	await expect(page.locator("body")).toHaveScreenshot();
});

test.describe("@a11y", () => {
	test("Axe Page Scan", async ({ page }) => {
		await page.goto("/tests/anchor");

		const axe = new AxeBuilder({ page });
		const accessibilityScan = await axe.analyze();
		expect(accessibilityScan.violations).toEqual([]);
	});
});
