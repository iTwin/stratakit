/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { test, expect } from "#playwright";
import AxeBuilder from "@axe-core/playwright";

test("default", async ({ page }) => {
	await page.goto("/tests/button");

	const button = page.getByRole("button");
	await expect(button).toHaveAccessibleName("Hello");
	await expect(button).toHaveAttribute("type", "button");

	await page.keyboard.press("Tab");
	await expect(button).toBeFocused();

	await page.keyboard.press("Enter");
	await expect(button).toHaveText("Clicked");
});

test("disabled", async ({ page }) => {
	await page.goto("/tests/button?disabled=true");

	const button = page.getByRole("button");
	await expect(button).toHaveAccessibleName("Hello");
	await expect(button).toBeDisabled();

	await page.keyboard.press("Tab");
	await expect(button).toBeFocused();

	// text should not change when a disabled button is clicked
	await button.click({ force: true });
	await expect(button).toHaveAccessibleName("Hello");

	await page.keyboard.press("Enter");
	await expect(button).toHaveAccessibleName("Hello");
});

test.describe("@visual", () => {
	for (const { name, path } of [
		{ name: "default", path: "/tests/button?visual=true" },
		{ name: "anchor", path: "/tests/button?anchor=true" },
	]) {
		test(name, async ({ page }) => {
			await page.goto(path);
			await expect(page.locator("body")).toHaveScreenshot();
		});

		test(`forced-colors-${name}`, async ({ page, browserName }) => {
			test.skip(
				browserName === "webkit",
				"Webkit does not support forced-colors",
			);
			await page.goto(path);
			await page.emulateMedia({ forcedColors: "active" });
			await expect(page.locator("body")).toHaveScreenshot();
		});
	}
});

test.describe("@a11y", () => {
	test("Axe Page Scan", async ({ page }) => {
		await page.goto("/tests/button");

		const button = page.getByRole("button");
		await expect(button).toBeVisible();

		const axe = new AxeBuilder({ page });
		const accessibilityScan = await axe.analyze();
		expect(accessibilityScan.violations).toEqual([]);
	});
});
