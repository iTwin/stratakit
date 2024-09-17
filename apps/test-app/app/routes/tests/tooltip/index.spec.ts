/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { test, expect } from "@playwright/test";

test("On initial load Tooltip should be hidden", async ({ page }) => {
	// Navigate to the page containing the tooltip
	await page.goto("/tests/tooltip");

	// Locate the target element that triggers the tooltip
	const trigger = page.getByText("Hello World");

	// Ensure the tooltip is hidden initially
	const tooltip = page.locator("text=Click Me!");
	await expect(tooltip).toBeHidden();
});
