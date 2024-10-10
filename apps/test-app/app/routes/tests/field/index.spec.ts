/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { test, expect } from "@playwright/test";

test.describe("default", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/tests/field");
	});

	test("wrapping input and label", async ({ page }) => {
		await expect(page.locator("input:not([type])")).toHaveAccessibleName(
			"Text example",
		);
	});

	test("wrapping textarea and label", async ({ page }) => {
		await expect(page.locator("textarea")).toHaveAccessibleName(
			"Textarea example",
		);
	});

	test("wrapping radio and label", async ({ page }) => {
		await expect(page.getByRole("radio")).toHaveAccessibleName("Radio example");
	});

	test("wrapping checkbox and label", async ({ page }) => {
		await expect(page.getByRole("checkbox")).toHaveAccessibleName(
			"Checkbox example",
		);
	});

	test("wrapping switch and label", async ({ page }) => {
		await expect(page.getByRole("switch")).toHaveAccessibleName(
			"Switch example",
		);
	});

	test("rendering as a label", async ({ page }) => {
		await expect(page.locator(".🥝-label.🥝-field")).toBeVisible();
	});
});
