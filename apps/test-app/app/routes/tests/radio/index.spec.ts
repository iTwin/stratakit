/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { test, expect } from "@playwright/test";

test("default", async ({ page }) => {
	await page.goto("/tests/radio", { waitUntil: "domcontentloaded" });

	const radioA = page.getByRole("radio", { name: "A" });
	const radioB = page.getByRole("radio", { name: "B" });
	await expect(radioA).not.toBeChecked();
	await expect(radioB).not.toBeChecked();

	await page.keyboard.press("Tab");
	await expect(radioA).toBeFocused();
	await expect(radioA).not.toBeChecked();

	await page.keyboard.press("ArrowDown");
	await expect(radioB).toBeFocused();
	await expect(radioB).toBeChecked();

	await page.keyboard.press("ArrowUp");
	await expect(radioA).toBeFocused();
	await expect(radioA).toBeChecked();
	await expect(radioB).not.toBeChecked();
});

test("default value", async ({ page }) => {
	await page.goto("/tests/radio?defaultValue=A", {
		waitUntil: "domcontentloaded",
	});

	const radioA = page.getByRole("radio", { name: "A" });
	const radioB = page.getByRole("radio", { name: "B" });
	await expect(radioA).toBeChecked();
	await expect(radioB).not.toBeChecked();

	await radioB.click();
	await expect(radioA).not.toBeChecked();
	await expect(radioB).toBeChecked();
});

test("disabled", async ({ page }) => {
	await page.goto("/tests/radio?disabled=true&defaultValue=B");
	await page.waitForTimeout(100);

	const radioA = page.getByRole("radio", { name: "A" });
	const radioB = page.getByRole("radio", { name: "B" });

	await page.keyboard.press("Tab");
	await expect(radioB).toBeChecked();
	await expect(radioB).toBeFocused();

	// should not be able to toggle the disabled radio
	await page.keyboard.press("ArrowUp");
	await expect(radioA).toBeFocused();
	await expect(radioA).not.toBeChecked();
	await expect(radioB).toBeChecked();
	await radioA.click({ force: true });
	await expect(radioA).not.toBeChecked();
});

test("visual", async ({ page }) => {
	await page.goto("/tests/radio");
	await expect(page.locator("body")).toHaveScreenshot();
});
