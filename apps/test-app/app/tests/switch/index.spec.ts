/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "#playwright";

test("default", async ({ page }) => {
	await page.goto("/tests/switch");

	const toggleSwitch = page.getByRole("switch");
	const label = page.getByText("Toggle me");

	await expect(toggleSwitch).toHaveAccessibleName("Toggle me");
	await expect(toggleSwitch).not.toBeChecked();

	await page.keyboard.press("Tab");
	await expect(toggleSwitch).toBeFocused();

	await page.keyboard.press("Space");
	await expect(toggleSwitch).toBeChecked();

	await label.click();
	await expect(toggleSwitch).not.toBeChecked();
});

test("checked", async ({ page }) => {
	await page.goto("/tests/switch?checked=true");

	const toggleSwitch = page.getByRole("switch");
	await expect(toggleSwitch).toBeChecked();

	await toggleSwitch.click();
	await expect(toggleSwitch).not.toBeChecked();
});

test("disabled", async ({ page }) => {
	await page.goto("/tests/switch?disabled=true");

	const toggleSwitch = page.getByRole("switch", { name: "Toggle me" });
	await expect(toggleSwitch).toBeDisabled();
	await expect(toggleSwitch).not.toBeChecked();

	await page.keyboard.press("Tab");
	await expect(toggleSwitch).toBeFocused();

	// should not be able to toggle the disabled switch
	await page.keyboard.press("Space");
	await expect(toggleSwitch).not.toBeChecked();
});

test.describe("@visual", () => {
	test("unchecked", async ({ page }) => {
		await page.goto("/tests/switch?visual=true");
		await expect(page.locator("body")).toHaveScreenshot();
	});
	test("checked", async ({ page }) => {
		await page.goto("/tests/switch?visual=true&checked=true");
		await expect(page.locator("body")).toHaveScreenshot();
	});
	test("disabled", async ({ page }) => {
		await page.goto("/tests/switch?visual=true&disabled=true");
		await expect(page.locator("body")).toHaveScreenshot();
	});
	test("disabled & checked", async ({ page }) => {
		await page.goto("/tests/switch?visual=true&disabled=true&checked=true");
		await expect(page.locator("body")).toHaveScreenshot();
	});
	test("forced-colors unchecked", async ({ page, browserName }) => {
		test.skip(
			browserName === "webkit",
			"Webkit does not support forced-colors",
		);
		await page.goto("/tests/switch?visual=true");
		await page.emulateMedia({ forcedColors: "active" });
		await expect(page.locator("body")).toHaveScreenshot();
	});
	test("forced-colors checked", async ({ page, browserName }) => {
		test.skip(
			browserName === "webkit",
			"Webkit does not support forced-colors",
		);
		await page.goto("/tests/switch?visual=true&checked=true");
		await page.emulateMedia({ forcedColors: "active" });
		await expect(page.locator("body")).toHaveScreenshot();
	});
	test("forced-colors disabled", async ({ page, browserName }) => {
		test.skip(
			browserName === "webkit",
			"Webkit does not support forced-colors",
		);
		await page.goto("/tests/switch?visual=true&disabled=true");
		await page.emulateMedia({ forcedColors: "active" });
		await expect(page.locator("body")).toHaveScreenshot();
	});
	test("forced-colors disabled & checked", async ({ page, browserName }) => {
		test.skip(
			browserName === "webkit",
			"Webkit does not support forced-colors",
		);
		await page.goto("/tests/switch?visual=true&disabled=true&checked=true");
		await page.emulateMedia({ forcedColors: "active" });
		await expect(page.locator("body")).toHaveScreenshot();
	});
});

test.describe("@a11y", () => {
	test("Axe Page Scan", async ({ page }) => {
		await page.goto("/tests/switch");

		const toggleSwitch = page.getByRole("switch");
		await expect(toggleSwitch).toBeVisible();

		const axe = new AxeBuilder({ page });
		const accessibilityScan = await axe.analyze();
		expect(accessibilityScan.violations).toEqual([]);
	});
});
