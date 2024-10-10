/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { test, expect } from "@playwright/test";

test("default", async ({ page }) => {
	await page.goto("/tests/button");

	const button = page.getByRole("button");
	await expect(button).toHaveAccessibleName("Hello");
	await expect(button).toHaveAttribute("type", "button");

	await page.keyboard.press("Tab");
	await expect(button).toBeFocused();

	await page.keyboard.press("Enter");
	await expect(button).toHaveText("Clicked");
});

test("disabled", async ({ page }) => {
	await page.goto("/tests/button?disabled=true");

	const button = page.getByRole("button");
	await expect(button).toHaveAccessibleName("Hello");
	await expect(button).toBeDisabled();

	await page.keyboard.press("Tab");
	await expect(button).toBeFocused();

	// text should not change when a disabled button is clicked
	await button.click({ force: true });
	await expect(button).toHaveAccessibleName("Hello");

	await page.keyboard.press("Enter");
	await expect(button).toHaveAccessibleName("Hello");
});

test("@visual", async ({ page }) => {
	await page.goto("/tests/button?visual=true");
	await expect(page.locator("body")).toHaveScreenshot();
});
