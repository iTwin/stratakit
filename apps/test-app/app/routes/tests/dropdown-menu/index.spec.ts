/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { test, expect } from "@playwright/test";

test("default", async ({ page }) => {
	await page.goto("/tests/dropdown-menu");

	const button = page.getByText("Actions");
	const add = page.getByText("Add");

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

	const button = page.getByText("Actions");
	const add = page.getByText("Add");
	const edit = page.getByText("Edit");
	const del = page.getByText("Delete");
	const disable = page.getByText("Disable");

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
