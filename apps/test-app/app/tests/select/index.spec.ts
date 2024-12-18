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

test("@visual", async ({ page }) => {
	await page.goto("/tests/select");
	await expect(page.locator("body")).toHaveScreenshot();
});

test("@a11y", async ({ page }) => {
	await page.goto("/tests/select");
	const axe = new AxeBuilder({ page });
	const accessibilityScan = await axe.analyze();
	expect(accessibilityScan.violations).toEqual([]);
});
