/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("default", async ({ page }) => {
	await page.goto("/tests/divider");
	const divider = page.getByRole("separator");
	await expect(divider).not.toHaveAttribute("aria-orientation");
});

test("horizontal", async ({ page }) => {
	await page.goto("/tests/divider?orientation=horizontal");
	const divider = page.getByRole("separator");
	await expect(divider).toHaveAttribute("aria-orientation", "horizontal");
});

test("vertical", async ({ page }) => {
	await page.goto("/tests/divider?orientation=vertical");
	const divider = page.getByRole("separator");
	await expect(divider).toHaveAttribute("aria-orientation", "vertical");
});

test("@visual", async ({ page }) => {
	await page.goto("/tests/divider?visual=true");
	await expect(page.locator("body")).toHaveScreenshot();
});

test.describe("@a11y", () => {
	test("Axe Page Scan", async ({ page }) => {
		await page.goto("/tests/divider");

		const axe = await new AxeBuilder({ page });
		const accessibilityScan = axe.analyze();
		expect((await accessibilityScan).violations).toEqual([]);
	});
});
