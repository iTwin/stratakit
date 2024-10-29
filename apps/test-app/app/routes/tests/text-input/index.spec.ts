/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { test, expect } from "@playwright/test";

test("default", async ({ page }) => {
	await page.goto("/tests/text-input");

	const input = page.getByRole("textbox");
	const label = page.getByText("Fruit");

	await expect(input).toHaveAccessibleName("Fruit");

	await label.click();
	await expect(input).toBeFocused();

	await page.keyboard.type("apple");
	await expect(input).toHaveValue("apple");
});

test("disabled", async ({ page }) => {
	await page.goto("/tests/text-input?disabled=true");

	const input = page.locator("input");
	await expect(input).toHaveAccessibleName("Fruit");
	await expect(input).toBeDisabled();

	await page.keyboard.press("Tab");
	await expect(input).toBeFocused();

	// should not be able to type in a disabled input
	await page.keyboard.type("apple");
	await expect(input).toHaveValue("");
});

test("@visual", async ({ page }) => {
	await page.goto("/tests/text-input");
	await expect(page.locator("body")).toHaveScreenshot();
});
