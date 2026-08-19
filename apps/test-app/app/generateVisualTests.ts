/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { expect, test } from "#playwright";
import { SCREENSHOT_TEST_ID } from "./ScreenShotTestId.ts";

/**
 * Creates tests for light, dark, and forced colors theme.  Expects the
 * components to be wrapped in {@link ScreenShotWrapper}.
 * @param path - the page to test
 */
export function generateVisualTests(path: string) {
	test("dark", async ({ page }) => {
		await page.emulateMedia({ colorScheme: "dark" });
		await page.goto(path);
		await expect(page.getByTestId(SCREENSHOT_TEST_ID)).toHaveScreenshot();
	});

	test("light", async ({ page }) => {
		await page.emulateMedia({ colorScheme: "light" });
		await page.goto(path);
		await expect(page.getByTestId(SCREENSHOT_TEST_ID)).toHaveScreenshot();
	});

	test("forced-colors", async ({ page }) => {
		await page.emulateMedia({ forcedColors: "active" });
		await page.goto(path);
		await expect(page.getByTestId(SCREENSHOT_TEST_ID)).toHaveScreenshot();
	});
}
