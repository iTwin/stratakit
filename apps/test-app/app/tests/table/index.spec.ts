/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("default", async ({ page }) => {
	await page.goto("/tests/table");

	const table = page.getByRole("table");
	await expect(table).toBeVisible();

	const columnHeaders = page.getByRole("columnheader");
	await expect(columnHeaders).toHaveCount(2);

	const rowGroups = page.getByRole("rowgroup");
	await expect(rowGroups).toHaveCount(2);

	const rows = page.getByRole("row");
	await expect(rows).toHaveCount(5);

	const cells = page.getByRole("cell");
	await expect(cells).toHaveCount(8);
});

test.describe("@visual", () => {
	test("default", async ({ page }) => {
		await page.goto("/tests/table?visual");
		await expect(page.locator("body")).toHaveScreenshot();
	});
	test("hovered row", async ({ page }) => {
		await page.goto("/tests/table?visual");
		const row = page.getByRole("row").nth(1);
		await row.hover();
		await expect(page.locator("body")).toHaveScreenshot();
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
