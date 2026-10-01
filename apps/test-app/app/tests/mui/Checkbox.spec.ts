/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { expect, test } from "#playwright";
import { colorSchemes } from "~/ColorSchemes.ts";
import { SCREENSHOT_TEST_ID } from "~/ScreenShotTestId.ts";

test.describe("@visual", () => {
	for (const scheme of colorSchemes) {
		test(scheme.name, async ({ page }) => {
			await page.emulateMedia(scheme.media);
			await page.goto("/showcase?path=mui/Checkbox.showcase&export=VisualTest");
			await expect(page.getByTestId(SCREENSHOT_TEST_ID)).toHaveScreenshot();
		});
	}

	test("hover", async ({ page }) => {
		await page.goto("/showcase?path=mui/Checkbox.showcase&export=Basic");
		await page.getByRole("checkbox").hover();
		await expect(page.getByTestId(SCREENSHOT_TEST_ID)).toHaveScreenshot();
	});

	test("focus ring", async ({ page }) => {
		await page.goto("/showcase?path=mui/Checkbox.showcase&export=Basic");
		await page.getByRole("checkbox").focus();
		await expect(page.getByTestId(SCREENSHOT_TEST_ID)).toHaveScreenshot();
	});
});
