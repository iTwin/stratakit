/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { test, expect } from "#playwright";
import AxeBuilder from "@axe-core/playwright";

test("default", async ({ page }) => {
	await page.goto("/tests/select");

	const select = page.getByRole("combobox", { name: "Fruit" });
	await expect(select).toBeVisible();

	await select.selectOption({ label: "Kiwi" });
	await expect(select).toHaveValue("kiwi");
});

test.describe("@visual", () => {
	test("default", async ({ page }) => {
		await page.goto("/tests/select?visual=true");
		await expect(page.locator("body")).toHaveScreenshot();
	});

	test("forced-colors", async ({ page, browserName }) => {
		test.skip(
			browserName === "webkit",
			"Webkit does not support forced-colors",
		);
		await page.goto("/tests/select?visual=true");
		await page.emulateMedia({ forcedColors: "active" });
		await expect(page.locator("body")).toHaveScreenshot();
	});
});

test("@a11y", async ({ page }) => {
	await page.goto("/tests/select");
	const axe = new AxeBuilder({ page });
	const accessibilityScan = await axe.analyze();
	expect(accessibilityScan.violations).toEqual([]);
});
