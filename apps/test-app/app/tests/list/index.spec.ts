/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { test, expect } from "#playwright";
import AxeBuilder from "@axe-core/playwright";

test("default", async ({ page }) => {
	await page.goto("/tests/list");

	const items = page.getByRole("listitem");
	await expect(items).toHaveCount(6);
});

test.describe("@visual", () => {
	test("default", async ({ page }) => {
		await page.goto("/tests/list");
		await expect(page.locator("body")).toHaveScreenshot();
	});

	test("hovered", async ({ page }) => {
		await page.goto("/tests/list");
		const item = page.getByText("Cherry");
		await item.hover();
		await expect(page.locator("body")).toHaveScreenshot();
	});

	test("pressed", async ({ page }) => {
		await page.goto("/tests/list");
		const item = page.getByText("Cherry");
		await item.hover();
		await page.mouse.down();
		await expect(page.locator("body")).toHaveScreenshot();
	});

	test("forced-colors default", async ({ page, browserName }) => {
		test.skip(
			browserName === "webkit",
			"Webkit does not support forced-colors",
		);
		await page.goto("/tests/list");
		await page.emulateMedia({ forcedColors: "active" });
		await expect(page.locator("body")).toHaveScreenshot();
	});
});

test.describe("@a11y", () => {
	test("Axe Page Scan", async ({ page }) => {
		await page.goto("/tests/list");

		const items = page.getByRole("listitem").first();
		await expect(items).toBeVisible();

		const axe = new AxeBuilder({ page });
		const accessibilityScan = await axe.analyze();
		expect(accessibilityScan.violations).toEqual([]);
	});
});
