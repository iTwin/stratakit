/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { test, expect } from "#playwright";

test("default", async ({ page }) => {
	await page.goto("/tests/code");
	const code = page.getByRole("code");
	await expect(code).toBeVisible();
});

test.describe("@visual", () => {
	test("default", async ({ page }) => {
		await page.goto("/tests/code?visual=true");
		await expect(page.locator("body")).toHaveScreenshot();
	});

	test("forced-colors", async ({ page, browserName }) => {
		test.skip(
			browserName === "webkit",
			"Webkit does not support forced-colors",
		);
		await page.goto("/tests/code?visual=true");
		await page.emulateMedia({ forcedColors: "active" });
		await expect(page.locator("body")).toHaveScreenshot();
	});
});
