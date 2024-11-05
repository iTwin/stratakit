/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("default", async ({ page }) => {
	await page.goto("/tests/list");

	const items = page.getByRole("listitem");
	await expect(items).toHaveCount(3);
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

	test("with icons", async ({ page }) => {
		await page.goto("/tests/list?with-icons");
		await expect(page.locator("body")).toHaveScreenshot();
	});
});

test.describe("@a11y", () => {
	test("Axe Page Scan", async ({ page }) => {
		await page.goto("/tests/list");

		const axe = await new AxeBuilder({ page });
		const accessibilityScan = axe.analyze();
		expect((await accessibilityScan).violations).toEqual([]);
	});
});
