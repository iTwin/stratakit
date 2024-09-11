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
