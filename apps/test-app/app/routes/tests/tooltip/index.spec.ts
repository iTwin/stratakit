/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { test, expect } from "@playwright/test";

test("should display tooltip on hover", async ({ page }) => {
	// Navigate to the page containing the tooltip
	await page.goto("/tests/tooltip");

	// Locate the target element that triggers the tooltip
	const trigger = page.getByText("Hello World");

	// Ensure the tooltip is hidden initially
	const tooltip = page.locator("text=Click Me!");
	await expect(tooltip).toBeHidden();

	// Hover over the trigger element
	await trigger.hover();

	// Expect the tooltip to be visible
	await expect(tooltip).toBeVisible();
});

test("should display tooltip on focus", async ({ page }) => {
	// Navigate to the page containing the tooltip
	await page.goto("/tests/tooltip");

	// Locate the element that should trigger the tooltip on focus
	const trigger = page.getByText("Hello World");

	// Ensure the tooltip is hidden initially
	const tooltip = page.locator("text=Tooltip Content");
	await expect(tooltip).toBeHidden();

	// Focus on the trigger element
	await trigger.focus();

	// Expect the tooltip to be visible
	await expect(tooltip).toBeVisible();
});
