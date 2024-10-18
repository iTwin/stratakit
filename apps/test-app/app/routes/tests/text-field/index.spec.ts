/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { test, expect } from "@playwright/test";

test("default", async ({ page }) => {
	await page.goto("/tests/text-field");

	const input = page.getByRole("textbox");
	await expect(input).toHaveValue("");

	await input.click();

	await page.keyboard.type("kiwi");
	await expect(input).toHaveValue("kiwi");
});

test("default (keyboard)", async ({ page }) => {
	await page.goto("/tests/text-field");

	const input = page.getByRole("textbox");
	await expect(input).toBeVisible();

	await page.keyboard.press("Tab");
	await expect(input).toBeFocused();

	await page.keyboard.type("kiwi");
	await expect(input).toHaveValue("kiwi");
});

test.describe("@visual", () => {
	test("default", async ({ page }) => {
		await page.goto("/tests/text-field?visual=true");
		await expect(page.locator("body")).toHaveScreenshot();
	});

	test("outline", async ({ page }) => {
		await page.goto("/tests/text-field?value=Value");
		const input = page.getByRole("textbox");
		await input.click();
		await expect(page.locator("body")).toHaveScreenshot();
	});
});
