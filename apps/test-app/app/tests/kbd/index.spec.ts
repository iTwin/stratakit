/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("default", async ({ page }) => {
	await page.goto("/tests/kbd");
	const kbdComponent = page.getByText("Ctrl");
	expect(await kbdComponent.evaluate((e) => e.localName)).toBe("kbd");
	await expect(kbdComponent).toBeVisible();
});

test.describe("@visual", () => {
	test("all variants", async ({ page }) => {
		await page.goto("/tests/kbd?visual=true");
		await expect(page.locator("body")).toHaveScreenshot();
	});

	test("all symbols", async ({ page }) => {
		await page.goto("/tests/kbd?symbols=true");
		await expect(page.locator("body")).toHaveScreenshot();
	});

	test("forced-colors", async ({ page, browserName }) => {
		test.skip(
			browserName === "webkit",
			"Webkit does not support forced-colors",
		);
		await page.goto("/tests/kbd?visual=true");
		await page.emulateMedia({ forcedColors: "active" });
		await expect(page.locator("body")).toHaveScreenshot();
	});
});

test.describe("@a11y", () => {
	test("Axe Page Scan", async ({ page }) => {
		await page.goto("/tests/kbd");

		const kbdComponent = page.getByText("Ctrl");
		await expect(kbdComponent).toBeVisible();

		const axe = new AxeBuilder({ page });
		const accessibilityScan = await axe.analyze();
		expect(accessibilityScan.violations).toEqual([]);
	});
});
