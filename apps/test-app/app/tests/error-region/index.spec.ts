/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { test, expect } from "#playwright";
import AxeBuilder from "@axe-core/playwright";

test("default", async ({ page }) => {
	await page.goto("/tests/error-region");

	const errors = page.getByRole("listitem");
	await expect(errors).toHaveCount(0);

	let button = page.getByRole("button", { name: "2 issues found" });
	await button.click();
	await expect(errors).toHaveCount(2);

	const error1 = errors.filter({
		has: page.getByText("Item 1"),
	});
	await expect(error1).toBeVisible();

	const dismiss = error1.getByRole("button", { name: "Dismiss" });
	await dismiss.click();
	button = page.getByRole("button", { name: "1 issue found" });
	await expect(button).toBeVisible();
	await expect(errors).toHaveCount(1);
});

test.describe("@visual", () => {
	test("default", async ({ page }) => {
		await page.goto("/tests/error-region");

		const button = page.getByRole("button", { name: "2 issues found" });
		await button.click();

		await expect(page.locator("body")).toHaveScreenshot();
	});
});

test.describe("@a11y", () => {
	test("Axe Page Scan", async ({ page }) => {
		await page.goto("/tests/error-region");

		const button = page.getByRole("button", { name: "2 issues found" });
		await button.click();

		const axe = new AxeBuilder({ page });
		const accessibilityScan = await axe.analyze();
		expect(accessibilityScan.violations).toEqual([]);
	});
});
