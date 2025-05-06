/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { test, expect } from "#playwright";
import AxeBuilder from "@axe-core/playwright";

test("default", async ({ page }) => {
	await page.goto("/tests/icon-button");

	const button = page.getByRole("button");
	await expect(button).toHaveAccessibleName("Click me");
	await expect(button).toHaveAttribute("type", "button");
});

test("custom icon", async ({ page }) => {
	await page.goto("/tests/icon-button?customIcon=true");

	const button = page.getByRole("button", { name: "Click me" });
	const icon = button.locator("svg[data-custom-icon]");
	await expect(icon).toBeVisible();
});

test("visually-hidden label", async ({ page }) => {
	await page.goto("/tests/icon-button?labelVariant=visually-hidden");

	const button = page.getByRole("button", { name: "Click me" });
	const tooltip = page.getByRole("tooltip", { includeHidden: true });

	await button.focus();
	await expect(tooltip).toHaveCount(0);
});

test("dot", async ({ page }) => {
	await page.goto("/tests/icon-button?dot=true");

	const button = page.getByRole("button", { name: "Notifications" });
	await expect(button).toHaveAccessibleDescription(
		"You have unread notifications",
	);
});

test.describe("@visual", () => {
	test("default", async ({ page }) => {
		await page.goto("/tests/icon-button?visual=true");
		await expect(page.locator("body")).toHaveScreenshot();
	});

	test("tooltip", async ({ page }) => {
		await page.goto("/tests/icon-button?visual=true&tooltip=true");
		await page.getByRole("button").focus();
		await expect(page.locator("body")).toHaveScreenshot();
	});

	test("forced-colors", async ({ page, browserName }) => {
		test.skip(
			browserName === "webkit",
			"Webkit does not support forced-colors",
		);
		await page.goto("/tests/icon-button?visual=true");
		await page.emulateMedia({ forcedColors: "active" });
		await expect(page.locator("body")).toHaveScreenshot();
	});
});

test.describe("@a11y", () => {
	test("Axe Page Scan", async ({ page }) => {
		await page.goto("/tests/icon-button");

		const button = page.getByRole("button");
		await expect(button).toBeVisible();

		const axe = new AxeBuilder({ page });
		const accessibilityScan = await axe.analyze();
		expect(accessibilityScan.violations).toEqual([]);
	});
});
