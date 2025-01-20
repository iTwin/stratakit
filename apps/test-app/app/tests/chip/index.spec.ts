/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { test, expect } from "#playwright";
import AxeBuilder from "@axe-core/playwright";

test.describe("@visual", () => {
	test("chips visual variants", async ({ page }) => {
		await page.goto("/tests/chip?visual=true");
		await expect(page.locator("body")).toHaveScreenshot();
	});

	test("chips dismiss variants", async ({ page }) => {
		await page.goto("/tests/chip?dismiss=true");
		await expect(page.locator("body")).toHaveScreenshot();
	});
});

test("Visual test for Chip with dismiss", async ({ page }) => {
	await page.goto("/tests/chip?dismiss=true");

	const dismissButton = page.getByRole("button", { name: "Dismiss" }).first();
	await expect(dismissButton).toBeVisible();
});

test("Test that the chip removes itself when the dismiss button is clicked.", async ({
	page,
}) => {
	await page.goto("/tests/chip?dismiss=true");

	const chips = page.locator(".🥝-chip");
	await expect(chips).toHaveCount(2);

	const dismissButton = chips.first().locator("button");
	await expect(dismissButton).toBeVisible();

	await dismissButton.click();

	await expect(chips).toHaveCount(1);
});

test.describe("@a11y", () => {
	test("Axe Page Scan", async ({ page }) => {
		await page.goto("/tests/chip");

		const chipComponent = page.getByText("Chip");
		await expect(chipComponent).toBeVisible();

		const axe = new AxeBuilder({ page });
		const accessibilityScan = await axe.analyze();
		expect(accessibilityScan.violations).toEqual([]);
	});
});
