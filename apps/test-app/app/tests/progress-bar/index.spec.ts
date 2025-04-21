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
		await expect(progressBar).toHaveAttribute("aria-valuemin", "0");
		await expect(progressBar).toHaveAttribute("aria-valuemax", "100");
		await expect(progressBar).toHaveAccessibleName("Loading…");
	});

	test("custom value", async ({ page }) => {
		await page.goto("/tests/progress-bar?determinate&value=75");
		const progressBar = page.getByRole("progressbar");
		await expect(progressBar).toHaveAttribute("aria-valuenow", "75");
		await expect(progressBar).toHaveAttribute("aria-valuemin", "0");
		await expect(progressBar).toHaveAttribute("aria-valuemax", "100");
		await expect(progressBar).toHaveAccessibleName("Loading…");
	});

	test("custom valueMin", async ({ page }) => {
		await page.goto("/tests/progress-bar?determinate&valueMin=10");
		const progressBar = page.getByRole("progressbar");
		await expect(progressBar).toHaveAttribute("aria-valuenow", "50");
		await expect(progressBar).toHaveAttribute("aria-valuemin", "10");
		await expect(progressBar).toHaveAttribute("aria-valuemax", "100");
		await expect(progressBar).toHaveAccessibleName("Loading…");
	});

	test("custom valueMax", async ({ page }) => {
		await page.goto("/tests/progress-bar?determinate&valueMax=200");
		const progressBar = page.getByRole("progressbar");
		await expect(progressBar).toHaveAttribute("aria-valuenow", "50");
		await expect(progressBar).toHaveAttribute("aria-valuemin", "0");
		await expect(progressBar).toHaveAttribute("aria-valuemax", "200");
		await expect(progressBar).toHaveAccessibleName("Loading…");
	});

	test("value cannot exceed valueMax", async ({ page }) => {
		await page.goto("/tests/progress-bar?determinate&value=200");
		const progressBar = page.getByRole("progressbar");
		await expect(progressBar).toHaveAttribute("aria-valuenow", "100");
		await expect(progressBar).toHaveAccessibleName("Loading…");
	});

	test("value cannot be less than valueMin", async ({ page }) => {
		await page.goto("/tests/progress-bar?determinate&value=-200");
		const progressBar = page.getByRole("progressbar");
		await expect(progressBar).toHaveAttribute("aria-valuenow", "0");
		await expect(progressBar).toHaveAccessibleName("Loading…");
	});
});

test.describe("@visual", () => {
	test("indeterminate", async ({ page }) => {
		await page.goto("/tests/progress-bar?visualIndeterminate");
		await expect(page.locator("body")).toHaveScreenshot();
	});

	test("determinate", async ({ page }) => {
		await page.goto("/tests/progress-bar?visualDeterminate");
		await expect(page.locator("body")).toHaveScreenshot();
	});

	test("forced-colors", async ({ page, browserName }) => {
		test.skip(
			browserName === "webkit",
			"Webkit does not support forced-colors",
		);
		await page.goto("/tests/progress-bar?visualIndeterminate");
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
