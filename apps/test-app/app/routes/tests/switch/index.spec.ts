/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { test, expect } from "@playwright/test";

test("default", async ({ page }) => {
	await page.goto("/tests/switch");

	const toggleSwitch = page.getByRole("switch");
	const label = page.getByText("Toggle me");

	await expect(toggleSwitch).toHaveAccessibleName("Toggle me");
	await expect(toggleSwitch).not.toBeChecked();

	await page.keyboard.press("Tab");
	await expect(toggleSwitch).toBeFocused();

	await page.keyboard.press("Space");
	await expect(toggleSwitch).toBeChecked();

	await label.click();
	await expect(toggleSwitch).not.toBeChecked();
});

test("checked", async ({ page }) => {
	await page.goto("/tests/switch?checked=true");

	const toggleSwitch = page.getByRole("switch");
	await expect(toggleSwitch).toBeChecked();

	await toggleSwitch.click();
	await expect(toggleSwitch).not.toBeChecked();
});

test("disabled", async ({ page }) => {
	await page.goto("/tests/switch?disabled=true");

	const toggleSwitch = page.getByRole("switch", { name: "Toggle me" });
	await expect(toggleSwitch).toBeDisabled();
	await expect(toggleSwitch).not.toBeChecked();

	await page.keyboard.press("Tab");
	await expect(toggleSwitch).toBeFocused();

	// should not be able to toggle the disabled switch
	await page.keyboard.press("Space");
	await expect(toggleSwitch).not.toBeChecked();
});

test.describe("@visual", () => {
	test("unchecked", async ({ page }) => {
		await page.goto("/tests/switch?visual=true");
		await expect(page.locator("body")).toHaveScreenshot();
	});
	test("checked", async ({ page }) => {
		await page.goto("/tests/switch?visual=true&checked=true");
		await expect(page.locator("body")).toHaveScreenshot();
	});
	test("disabled", async ({ page }) => {
		await page.goto("/tests/switch?visual=true&disabled=true");
		await expect(page.locator("body")).toHaveScreenshot();
	});
	test("disabled & checked", async ({ page }) => {
		await page.goto("/tests/switch?visual=true&disabled=true&checked=true");
		await expect(page.locator("body")).toHaveScreenshot();
	});
});
