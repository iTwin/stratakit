/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { test, expect } from "@playwright/test";

test("default", async ({ page }) => {
	await page.goto("/tests/tooltip");

	const trigger = page.getByText("Hello World");
	const tooltip = page.getByRole("button", { name: "Click Me!" });
	await expect(tooltip).toBeHidden();
});

test("Pressing Escape should clear the tooltip", async ({ page }) => {
	await page.goto("/tests/tooltip");

	const button = page.getByRole("button");
	const tooltip = page.getByRole("button", { name: "Click Me!" });

	await page.keyboard.press("Tab");
	await expect(tooltip).toBeHidden();
});

test("Keyboard Focus on related element should display the tooltip", async ({
	page,
}) => {
	await page.goto("/tests/tooltip");

	const button = page.getByRole("button", { name: "Hello World" });
	await button.focus();

	const tooltip = page.getByRole("tooltip");
	await expect(tooltip).toBeVisible();
});

test("Mouse In / Hover - should display the tooltip", async ({ page }) => {
	await page.goto("/tests/tooltip");

	const button = page.getByRole("button", { name: "Hello World" });
	await button.hover();

	const tooltip = page.getByRole("tooltip");
	await expect(tooltip).toBeVisible();
});

test("Mouse Out / unhover(!) - should hide the tooltip", async ({ page }) => {
	await page.goto("/tests/tooltip");

	const button = page.getByRole("button", { name: "Hello World" });
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

	const button = page.getByRole("button", { name: "Hello World" });
	await button.hover();

	const tooltip = page.getByRole("tooltip");
	await expect(tooltip).toBeVisible();

	await tooltip.hover();
	await expect(tooltip).toBeVisible(); // Ensure tooltip is still visible
});

// test("Keyboard loss of Focus on the related element should hide the tooltip", async ({
// 	page,
// }) => {
// 	await page.goto("/tests/tooltip");

// 	const button = page.getByRole("button", { name: "Hello World" });
// 	await button.focus();

// 	const tooltip = page.getByRole("tooltip");
// 	await expect(tooltip).toBeVisible();

// 	await page.keyboard.press("Tab"); // Move focus away
// 	await expect(tooltip).toBeHidden();
// });

test("visual", async ({ page }) => {
	await page.goto("/tests/tooltip?visual=true");
	await expect(page.locator("body")).toHaveScreenshot();
});
