/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { test, expect } from "#playwright";
import AxeBuilder from "@axe-core/playwright";

test("default", async ({ page }) => {
	await page.goto("/tests/progress-bar");
	const progressBar = page.getByTestId("progress-bar");
	await expect(progressBar).toBeVisible();
	await expect(progressBar).toHaveRole("progressbar");
	await expect(progressBar).toHaveAccessibleName("Loading…");
});

test.describe("@visual", () => {
	test("default", async ({ page }) => {
		await page.goto("/tests/progress-bar?visual=true");
		await expect(page.locator("body")).toHaveScreenshot();
	});

	test("forced-colors", async ({ page, browserName }) => {
		test.skip(
			browserName === "webkit",
			"forced-colors for Button does not appear correctly in Webkit",
		);
		await page.goto("/tests/progress-bar?visual=true");
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
