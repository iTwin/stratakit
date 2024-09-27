/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { test, expect } from "@playwright/test";

test("Pressing Escape should hide the tooltip", async ({ page }) => {
	await page.goto("/tests/tooltip");

	const button = page.getByRole("button");

	await button.focus();

	await expect(button).toBeFocused();

	const tooltip = page.getByRole("tooltip");
	await expect(tooltip).toBeVisible();

	await page.keyboard.press("Escape");

	await expect(tooltip).toBeHidden();
});

test("Keyboard Focus on related element should display the tooltip", async ({
	page,
}) => {
	await page.goto("/tests/tooltip");

	const button = page.getByRole("button");
	await button.focus();

	const tooltip = page.getByRole("tooltip");
	await expect(tooltip).toBeVisible();
});

test("Mouse In / Hover - should display the tooltip", async ({ page }) => {
	await page.goto("/tests/tooltip");

	const button = page.getByRole("button");
	await expect(button).toBeVisible();

	await button.hover();

	const tooltip = page.getByRole("tooltip");
	await expect(tooltip).toBeVisible();
});

test("Mouse Out / Normal - should hide the tooltip", async ({ page }) => {
	await page.goto("/tests/tooltip");

	const button = page.getByRole("button");
	await button.hover();

	const tooltip = page.getByRole("tooltip");
	await expect(tooltip).toBeVisible();

	await page.mouse.move(0, 0); // Move to top-left corner of the page
	await expect(tooltip).toBeHidden();
});

test("Tooltip should stay displayed during hover (should not hide)", async ({
	page,
}) => {
	await page.goto("/tests/tooltip");

	const button = page.getByRole("button");
	await button.hover();

	const tooltip = page.getByRole("tooltip");
	await expect(tooltip).toBeVisible();

	await tooltip.hover();
	await page.waitForTimeout(3000);
	await expect(tooltip).toBeVisible();
});

test("Keyboard loss of Focus on the related element should hide the tooltip", async ({
	page,
}) => {
	await page.goto("/tests/tooltip");

	const tooltip = page.getByRole("tooltip");
	const button = page.getByRole("button");

	await expect(tooltip).toBeHidden();

	await button.focus();
	await expect(button).toBeFocused();

	await expect(tooltip).toBeVisible();

	await page.mouse.click(0, 0); // Ensures loss of focus.

	await expect(tooltip).toBeHidden();
});
