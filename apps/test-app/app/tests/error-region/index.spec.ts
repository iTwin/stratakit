/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "#playwright";

test("default", async ({ page }) => {
	await page.goto("/tests/error-region");

	const errors = page.getByRole("listitem");
	await expect(errors).toHaveCount(0);

	let disclosure = page.getByRole("button", { name: "2 issues found" });
	await disclosure.click();
	await expect(errors).toHaveCount(2);

	const error1 = errors.filter({
		has: page.getByText("Item 1"),
	});
	await expect(error1).toBeVisible();

	const retry = error1.getByRole("button", { name: "Retry" });
	await retry.click();
	disclosure = page.getByRole("button", { name: "1 issue found" });
	await expect(disclosure).toBeVisible();
	await expect(errors).toHaveCount(1);
});

test.describe("@visual", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/tests/error-region");

		const disclosure = page.getByRole("button");
		await disclosure.click();
	});

	test("default", async ({ page }) => {
		await expect(page.locator("body")).toHaveScreenshot();
	});

	test("forced-colors", async ({ page, browserName }) => {
		test.skip(
			browserName === "webkit",
			"Webkit does not support forced-colors",
		);
		await page.emulateMedia({ forcedColors: "active" });
		await expect(page.locator("body")).toHaveScreenshot();
	});
});

test.describe("@a11y", () => {
	test("Axe Page Scan", async ({ page }) => {
		await page.goto("/tests/error-region");

		const disclosure = page.getByRole("button");
		await disclosure.click();

		const axe = new AxeBuilder({ page });
		const accessibilityScan = await axe.analyze();
		expect(accessibilityScan.violations).toEqual([]);
	});
});
