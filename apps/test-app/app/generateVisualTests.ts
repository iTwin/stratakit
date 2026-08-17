/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { expect, test } from "#playwright";

export function generateVisualTests(path: string) {
	test("dark", async ({ page }) => {
		await page.emulateMedia({ colorScheme: "dark" });
		await page.goto(path);
		await expect(page.getByTestId("screenshot")).toHaveScreenshot();
	});

	test("light", async ({ page }) => {
		await page.emulateMedia({ colorScheme: "light" });
		await page.goto(path);
		await expect(page.getByTestId("screenshot")).toHaveScreenshot();
	});

	test("forced-colors", async ({ page }) => {
		await page.emulateMedia({ forcedColors: "active" });
		await page.goto(path);
		await expect(page.getByTestId("screenshot")).toHaveScreenshot();
	});
}
