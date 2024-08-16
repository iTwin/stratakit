/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { test, expect } from "@playwright/test";

test("default", async ({ page }) => {
	await page.goto("/tests/anchor");

	const anchor = page.getByRole("link");
	const heading = page.getByRole("heading");

	await expect(anchor).toHaveAccessibleName("Hello");

	await page.keyboard.press("Tab");
	await expect(anchor).toBeFocused();

	// clicking a fragment link moves focus to the target element
	await page.keyboard.press("Enter");
	await expect(heading).toBeFocused();
});

test("disabled", async ({ page }) => {
	await page.goto("/tests/anchor?disabled=true");

	const anchor = page.getByRole("link");
	const heading = page.getByRole("heading");

	await expect(anchor).toHaveAccessibleName("Hello");
	await expect(anchor).toBeDisabled();

	await page.keyboard.press("Tab");
	await expect(anchor).toBeFocused();

	// disabled anchor should not navigate
	await page.keyboard.press("Enter");
	await expect(heading).not.toBeFocused();
	await anchor.click({ force: true });
	await expect(heading).not.toBeFocused();
	await expect(anchor).toBeFocused();
});
