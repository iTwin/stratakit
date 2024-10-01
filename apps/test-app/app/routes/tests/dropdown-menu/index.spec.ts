/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { test, expect } from "@playwright/test";

test("default", async ({ page }) => {
	await page.goto("/tests/dropdown-menu");

	const button = page.getByRole("button", { name: "Actions" });
	const add = page.getByRole("menuitem", { name: "Add" });

	await button.click();
	await expect(add).toBeVisible();

	await add.click();
	await expect(add).not.toBeVisible();

	await button.click();
	await expect(add).toBeVisible();

	await page.click("body");
	await expect(add).not.toBeVisible();
});

test("default (keyboard)", async ({ page }) => {
	await page.goto("/tests/dropdown-menu");

	const button = page.getByRole("button", { name: "Actions" });
	const add = page.getByRole("menuitem", { name: "Add" });
	const edit = page.getByRole("menuitem", { name: "Edit" });
	const del = page.getByRole("menuitem", { name: "Delete" });
	const disable = page.getByRole("menuitem", { name: "Disable" });

	await expect(button).toBeVisible();

	await page.keyboard.press("Tab");
	await page.keyboard.press("Enter");
	await expect(add).toBeFocused();

	await page.keyboard.press("ArrowDown");
	await expect(edit).toBeFocused();

	await expect(del).toBeDisabled();
	await page.keyboard.press("ArrowDown");
	await expect(disable).toBeFocused();

	await page.keyboard.press("Enter");
	await expect(add).not.toBeVisible();
	await expect(button).toBeFocused();

	await page.keyboard.press("Enter");
	await expect(add).toBeVisible();

	await page.keyboard.press("Escape");
	await expect(add).not.toBeVisible();
	await expect(button).toBeFocused();
});

test("visual", async ({ page }) => {
	await page.goto("/tests/dropdown-menu?visual=true");
	await expect(page.locator("body")).toHaveScreenshot();
});
