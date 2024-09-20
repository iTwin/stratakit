/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { test, expect } from "@playwright/test";

test("On initial load Tooltip should be hidden", async ({ page }) => {
	await page.goto("/tests/tooltip");

	const trigger = page.getByText("Hello World");

	const tooltip = page.getByRole("button", { name: "Click Me!" });

	await expect(tooltip).toBeHidden();
});
