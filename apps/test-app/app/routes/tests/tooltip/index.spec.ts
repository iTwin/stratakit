/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { test, expect } from "@playwright/test";

test("Pressing Escape should hide the tooltip", async ({ page }) => {
	await page.goto("/tests/tooltip");

	const button = page.getByRole("button");
	const tooltip = page.getByRole("tooltip");

	await button.focus();

	await expect(tooltip).toBeVisible();

	await page.keyboard.press("Escape");

	await expect(tooltip).toBeHidden();
});

test("Keyboard Focus on related element should display the tooltip", async ({
	page,
}) => {
	await page.goto("/tests/tooltip");

	const button = page.getByRole("button");
	const tooltip = page.getByRole("tooltip");

	await button.focus();

	await expect(tooltip).toBeVisible();
});

test("Mouse In / Hover - should display the tooltip", async ({ page }) => {
	await page.goto("/tests/tooltip");

	const button = page.getByRole("button");
	const tooltip = page.getByRole("tooltip");

	await button.hover();

	await expect(tooltip).toBeVisible();
});

test("Mouse Out / Normal - should hide the tooltip", async ({ page }) => {
	await page.goto("/tests/tooltip");

	const button = page.getByRole("button");
	const tooltip = page.getByRole("tooltip");

	await button.hover();

	await expect(tooltip).toBeVisible();

	await page.mouse.move(0, 0);

	await expect(tooltip).toBeHidden();
});

test("Tooltip should stay displayed during hover (should not hide)", async ({
	page,
}) => {
	await page.goto("/tests/tooltip");

	const button = page.getByRole("button");
	const tooltip = page.getByRole("tooltip");

	await button.hover();
	await expect(tooltip).toBeVisible();
	await tooltip.hover();
	await page.waitForTimeout(3000);

	await expect(tooltip).toBeVisible();
});

test("Keyboard loss of Focus on the related element should hide the tooltip", async ({
	page,
}) => {
	await page.goto("/tests/tooltip");

	const button = page.getByRole("button");
	const tooltip = page.getByRole("tooltip");

	await expect(tooltip).toBeHidden();

	await button.focus();

	await expect(tooltip).toBeVisible();

	await page.mouse.click(0, 0); // Ensures loss of focus.

	await expect(tooltip).toBeHidden();
});

test("Is aria-describedby is set correctly ?", async ({ page }) => {
	await page.goto("/tests/tooltip");

	const button = await page.getByRole("button");

	await expect(button).toHaveAccessibleDescription("This is the tooltip");
});
