/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import AxeBuilder from "@axe-core/playwright";

import { expect, test } from "#playwright";

test("default", async ({ page }) => {
	await page.goto("/tests/progress-bar");
	const progressBar = page.getByRole("progressbar");
	await expect(progressBar).toBeVisible();
	await expect(progressBar).toHaveAccessibleName("Loading…");
});

test.describe("determinate", () => {
	test("default", async ({ page }) => {
		await page.goto("/tests/progress-bar?determinate");
		const progressBar = page.getByRole("progressbar");
		await expect(progressBar).toBeVisible();
		await expect(progressBar).toHaveAttribute("aria-valuenow", "50");
		await expect(progressBar).toHaveAccessibleName("Loading…");
	});

	test("custom value", async ({ page }) => {
		await page.goto("/tests/progress-bar?determinate&value=75");
		const progressBar = page.getByRole("progressbar");
		await expect(progressBar).toHaveAttribute("aria-valuenow", "75");
		await expect(progressBar).toHaveAccessibleName("Loading…");
	});

	test("value cannot exceed 100", async ({ page }) => {
		await page.goto("/tests/progress-bar?determinate&value=200");
		const progressBar = page.getByRole("progressbar");
		await expect(progressBar).toHaveAttribute("aria-valuenow", "100");
		await expect(progressBar).toHaveAccessibleName("Loading…");
	});

	test("value cannot be less than 0", async ({ page }) => {
		await page.goto("/tests/progress-bar?determinate&value=-200");
		const progressBar = page.getByRole("progressbar");
		await expect(progressBar).toHaveAttribute("aria-valuenow", "0");
		await expect(progressBar).toHaveAccessibleName("Loading…");
	});
});

test.describe("@visual", () => {
	test("default", async ({ page }) => {
		await page.goto("/tests/progress-bar?visual");
		await expect(page.locator("body")).toHaveScreenshot();
	});

	test("forced-colors", async ({ page, browserName }) => {
		test.skip(
			browserName === "webkit",
			"Webkit does not support forced-colors",
		);
		await page.goto("/tests/progress-bar?visual");
		await page.emulateMedia({ forcedColors: "active" });
		await expect(page.locator("body")).toHaveScreenshot();
	});
});

test.describe("@a11y", () => {
	test("Axe Page Scan", async ({ page }) => {
		await page.goto("/tests/progress-bar");

		const axe = new AxeBuilder({ page });
		const accessibilityScan = await axe.analyze();
		expect(accessibilityScan.violations).toEqual([]);
	});
});
