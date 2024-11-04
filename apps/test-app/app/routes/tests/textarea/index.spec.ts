/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("default", async ({ page }) => {
	await page.goto("/tests/textarea");

	const textarea = page.locator("textarea");
	const label = page.getByText("Fruit");

	await expect(textarea).toHaveAccessibleName("Fruit");

	await label.click();
	await expect(textarea).toBeFocused();

	await page.keyboard.type("apple");
	await expect(textarea).toHaveValue("apple");
});

test("disabled", async ({ page }) => {
	await page.goto("/tests/textarea?disabled=true");

	const textarea = page.locator("textarea");
	await expect(textarea).toHaveAccessibleName("Fruit");
	await expect(textarea).toBeDisabled();

	await page.keyboard.press("Tab");
	await expect(textarea).toBeFocused();

	// should not be able to type in a disabled textarea
	await page.keyboard.type("apple");
	await expect(textarea).toHaveValue("");
});

test("@visual", async ({ page }) => {
	await page.goto("/tests/textarea");
	await expect(page.locator("body")).toHaveScreenshot();
});

test.describe("@a11y", () => {
	test("Axe Page Scan", async ({ page }) => {
		await page.goto("/tests/textarea");

		const axe = await new AxeBuilder({ page });
		const accessibilityScan = axe.analyze();
		expect((await accessibilityScan).violations).toEqual([]);
	});
});
