/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { test, expect } from "@playwright/test";

test("default", async ({ page }) => {
	await page.goto("/tests/icon-button");

	const button = page.getByRole("button");
	await expect(button).toHaveAccessibleName("Click me");
	await expect(button).toHaveAttribute("type", "button");
});

test("custom icon", async ({ page }) => {
	await page.goto("/tests/icon-button?customIcon=true");

	const button = page.getByRole("button", { name: "Click me" });
	const icon = button.locator("svg[data-custom-icon]");
	await expect(icon).toBeVisible();
});

test("@visual", async ({ page }) => {
	await page.goto("/tests/icon-button?visual=true");
	await expect(page.locator("body")).toHaveScreenshot();
});
