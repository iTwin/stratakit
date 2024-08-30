/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { test, expect } from "@playwright/test";

test("default", async ({ page }) => {
	await page.goto("/tests/checkbox");

	const checkbox = page.getByRole("checkbox");
	const label = page.getByText("Toggle me");

	await expect(checkbox).toHaveAccessibleName("Toggle me");
	await expect(checkbox).not.toBeChecked();

	await page.keyboard.press("Tab");
	await expect(checkbox).toBeFocused();

	await page.keyboard.press("Space");
	await expect(checkbox).toBeChecked();

	await label.click();
	await expect(checkbox).not.toBeChecked();
});

test("checked", async ({ page }) => {
	await page.goto("/tests/checkbox?checked=true");

	const checkbox = page.getByRole("checkbox");
	await expect(checkbox).toBeChecked();

	await checkbox.click();
	await expect(checkbox).not.toBeChecked();
});

test("indeterminate/mixed", async ({ page }) => {
	await page.goto("/tests/checkbox?indeterminate=true");

	const checkbox = page.getByRole("checkbox");
	await expect(checkbox).toHaveAttribute("aria-checked", "mixed");

	await checkbox.click();
	await expect(checkbox).toBeChecked();

	await checkbox.click();
	await expect(checkbox).not.toBeChecked();
});

test("disabled", async ({ page }) => {
	await page.goto("/tests/checkbox?disabled=true");

	const checkbox = page.getByRole("checkbox", { name: "Toggle me" });
	await expect(checkbox).toBeDisabled();
	await expect(checkbox).not.toBeChecked();

	await page.keyboard.press("Tab");
	await expect(checkbox).toBeFocused();

	// should not be able to toggle the disabled checkbox
	await page.keyboard.press("Space");
	await expect(checkbox).not.toBeChecked();
});

test("visual", async ({ page }) => {
	await page.goto("/tests/checkbox");
	await expect(page.locator("body")).toHaveScreenshot();
});
