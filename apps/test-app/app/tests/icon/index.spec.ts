/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { test, expect } from "#playwright";
import AxeBuilder from "@axe-core/playwright";

test("default", async ({ page }) => {
	await page.goto("/tests/icon");

	const icon = page.locator("svg").first();
	await expect(icon).toHaveAttribute("aria-hidden", "true");
});

test("alt prop", async ({ page }) => {
	await page.goto("/tests/icon?alt=Help me");

	const icon = page.getByRole("img");
	await expect(icon).toHaveAccessibleName("Help me");
	await expect(icon).not.toHaveAttribute("aria-hidden");
});

test.describe("@visual", () => {
	test("default", async ({ page }) => {
		await page.goto("/tests/icon");
		await expect(page.locator("body")).toHaveScreenshot();
	});

	test("large", async ({ page }) => {
		await page.goto("/tests/icon?size=large");
		await expect(page.locator("body")).toHaveScreenshot();
	});

	test("render prop", async ({ page }) => {
		await page.goto("/tests/icon?renderProp=true");
		await expect(page.locator("body")).toHaveScreenshot();
	});

	test("data uri fallback", async ({ page }) => {
		await page.goto("/tests/icon?_fallback");
		await expect(page.locator("body")).toHaveScreenshot();
	});
});

test.describe("@a11y", () => {
	test("Axe Page Scan", async ({ page }) => {
		await page.goto("/tests/icon");

		const icon = page.locator("svg").first();
		await expect(icon).toBeVisible();

		const axe = new AxeBuilder({ page });
		const accessibilityScan = await axe.analyze();
		expect(accessibilityScan.violations).toEqual([]);
	});
});
