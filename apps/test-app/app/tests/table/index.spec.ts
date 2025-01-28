/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("default", async ({ page }) => {
	await page.goto("/tests/table");

	const table = page.getByRole("table").first();
	await expect(table).toBeVisible();

	const header = page.getByRole("columnheader").first();
	await expect(header).toBeVisible();

	const rowGroups = page.getByRole("rowgroup").first();
	await expect(rowGroups).toBeVisible();

	const rows = page.getByRole("row").first();
	await expect(rows).toBeVisible();
});

test.describe("@visual", () => {
	test("default", async ({ page }) => {
		await page.goto("/tests/table");
		await expect(page.locator("body")).toHaveScreenshot();
	});

	test("header", async ({ page }) => {
		await page.goto("/tests/table");
		const columnHeaders = page.getByRole("columnheader");
		await expect(columnHeaders).toHaveCount(3);
	});

	test("table rows", async ({ page }) => {
		await page.goto("/tests/table");
		const rows = page.getByRole("row");
		await expect(rows).toHaveCount(11);
	});
});

test.describe("@a11y", () => {
	test("Axe Page Scan", async ({ page }) => {
		await page.goto("/tests/table");

		const table = page.getByRole("table");
		await expect(table).toBeVisible();

		const axe = new AxeBuilder({ page });
		const accessibilityScan = await axe.analyze();
		expect(accessibilityScan.violations).toEqual([]);
	});
});
