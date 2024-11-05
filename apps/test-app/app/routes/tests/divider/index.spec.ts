/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { test, expect } from "@playwright/test";

test("default", async ({ page }) => {
	await page.goto("/tests/divider");
	const divider = page.getByRole("separator");
	await expect(divider).not.toHaveAttribute("aria-orientation");
});

test("horizontal", async ({ page }) => {
	await page.goto("/tests/divider?orientation=horizontal");
	const divider = page.getByRole("separator");
	await expect(divider).toHaveAttribute("aria-orientation", "horizontal");
});

test("vertical", async ({ page }) => {
	await page.goto("/tests/divider?orientation=vertical");
	const divider = page.getByRole("separator");
	await expect(divider).toHaveAttribute("aria-orientation", "vertical");
});

test("presentational", async ({ page }) => {
	await page.goto("/tests/divider?presentational=true");
	const divider = page.getByTestId("divider");
	expect(await divider.evaluate((e) => e.localName)).toBe("div");
	await expect(divider).not.toHaveAttribute("role");
	await expect(divider).not.toHaveAttribute("aria-orientation");
});

test("@visual", async ({ page }) => {
	await page.goto("/tests/divider?visual=true");
	await expect(page.locator("body")).toHaveScreenshot();
});
