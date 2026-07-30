/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { expect, test } from "#playwright";

test.describe("@visual", () => {
	test("dark", async ({ page }) => {
		await page.emulateMedia({ colorScheme: "dark" });
		await page.goto("/tests/mui/Button?only=_icons,_permutations,sizes");
		await expect(page.locator('[data-example="all"]')).toHaveScreenshot();
	});

	test("light", async ({ page }) => {
		await page.emulateMedia({ colorScheme: "light" });
		await page.goto("/tests/mui/Button?only=_icons,_permutations,sizes");
		await expect(page.locator('[data-example="all"]')).toHaveScreenshot();
	});

	test("forced-colors", async ({ page }) => {
		await page.goto("/tests/mui/Button?only=_icons,_permutations,sizes");
		await page.emulateMedia({ forcedColors: "active" });
		await expect(page.locator('[data-example="all"]')).toHaveScreenshot();
	});
});
