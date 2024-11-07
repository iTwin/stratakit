/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

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

	const radioA = page.getByRole("radio", { name: "A" });
	const radioB = page.getByRole("radio", { name: "B" });

	await expect(radioB).toBeChecked();
	await page.keyboard.press("Tab");
	await expect(radioB).toBeFocused();

	// should not be able to toggle the disabled radio
	await page.keyboard.press("ArrowUp");
	await expect(radioA).not.toBeChecked();
	await expect(radioB).toBeChecked();
	await expect(radioA).toBeFocused();
	await radioA.click({ force: true });
	await expect(radioA).not.toBeChecked();
});

test.describe("@visual", () => {
	test("unchecked", async ({ page }) => {
		await page.goto("/tests/radio?visual=true");
		await expect(page.locator("body")).toHaveScreenshot();
	});

	test("checked", async ({ page }) => {
		await page.goto("/tests/radio?visual=true&checked=true");
		await expect(page.locator("body")).toHaveScreenshot();
	});

	test("disabled", async ({ page }) => {
		await page.goto("/tests/radio?visual=true&disabled=true");
		await expect(page.locator("body")).toHaveScreenshot();
	});

	test("disabled & checked", async ({ page }) => {
		await page.goto("/tests/radio?visual=true&disabled=true&checked=true");
		await expect(page.locator("body")).toHaveScreenshot();
	});
});

test.describe("@a11y", () => {
	test("Axe Page Scan", async ({ page }) => {
		await page.goto("/tests/radio");

		const radioA = page.getByRole("radio", { name: "A" });
		await expect(radioA).toBeVisible();

		const axe = new AxeBuilder({ page });
		const accessibilityScan = await axe.analyze();
		expect(accessibilityScan.violations).toEqual([]);
	});
});
