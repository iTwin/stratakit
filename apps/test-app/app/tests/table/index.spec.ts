/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("default", async ({ page }) => {
	await page.goto("/tests/table");

	const table = page.getByRole("table");
	await expect(table).toBeVisible();

	await expect(table).toHaveAccessibleName("Fruits and their colors");

	const columnHeaders = page.getByRole("columnheader");
	await expect(columnHeaders).toHaveCount(2);

	const rowGroups = page.getByRole("rowgroup");
	await expect(rowGroups).toHaveCount(1);

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

	test("forced-colors", async ({ page, browserName }) => {
		test.skip(
			browserName === "webkit",
			"Webkit does not support forced-colors",
		);
		await page.goto("/tests/table?visual=true");
		await page.emulateMedia({ forcedColors: "active" });
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
