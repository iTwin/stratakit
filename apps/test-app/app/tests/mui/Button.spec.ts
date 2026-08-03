/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { expect, test } from "#playwright";

test.describe
	.only("@visual", () => {
		test("dark", async ({ page }) => {
			await page.emulateMedia({ colorScheme: "dark" });
			await page.goto("/tests/mui/Button/Visual");
			await expect(page.getByTestId("screenshot")).toHaveScreenshot();
		});

		test("light", async ({ page }) => {
			await page.emulateMedia({ colorScheme: "light" });
			await page.goto("/tests/mui/Button/Visual");
			await expect(page.getByTestId("screenshot")).toHaveScreenshot();
		});

		test("forced-colors", async ({ page }) => {
			await page.emulateMedia({ forcedColors: "active" });
			await page.goto("/tests/mui/Button/Visual");
			await expect(page.getByTestId("screenshot")).toHaveScreenshot();
		});
	});
