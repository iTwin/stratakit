/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("default", async ({ page }) => {
	await page.goto("/tests/icon-button");

	const button = page.getByRole("button");
	await expect(button).toHaveAccessibleName("Click me");
	await expect(button).toHaveAttribute("type", "button");
});

test("custom icon", async ({ page }) => {
	await page.goto("/tests/icon-button?customIcon=true");

	const button = page.getByRole("button", { name: "Click me" });
	const icon = button.locator("svg[data-custom-icon]");
	await expect(icon).toBeVisible();
});

test.describe("@visual", () => {
	test("default", async ({ page }) => {
		await page.goto("/tests/icon-button?visual=true");
		await expect(page.locator("body")).toHaveScreenshot();
	});

	test("tooltip", async ({ page }) => {
		await page.goto("/tests/icon-button?visual=true&tooltip=true");
		await page.getByRole("button").focus();
		await expect(page.locator("body")).toHaveScreenshot();
	});
});

test.describe("@a11y", () => {
	test("Axe Page Scan", async ({ page }) => {
		await page.goto("/tests/icon-button");

		const button = page.getByRole("button");
		await expect(button).toBeVisible();

		const axe = new AxeBuilder({ page });
		const accessibilityScan = await axe.analyze();
		expect(accessibilityScan.violations).toEqual([]);
	});
});
