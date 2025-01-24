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

test("onDismiss prop", async ({ page }) => {
	await page.goto("/tests/chip?dismiss=true");

	const chip = page.locator(".🥝-chip").first();
	const dismissButton = chip.getByRole("button", { name: "Dismiss" }).first();

	await dismissButton.click();
	await expect(chip).toHaveAttribute("data-dismissed", "true");
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
