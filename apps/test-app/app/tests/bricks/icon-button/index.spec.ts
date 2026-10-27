/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "#playwright";

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

test("active link", async ({ page }) => {
	await page.goto("/tests/icon-button?_activeLink=true");

	const link = page.getByRole("link", { name: "Click me" });
	await expect(link).toHaveAttribute("aria-current", "true");
	await expect(link).not.toHaveAttribute("aria-pressed");
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

	test("forced-colors", async ({ page }) => {
		await page.goto("/tests/icon-button?visual=true");
		await page.emulateMedia({ forcedColors: "active" });
		await expect(page.locator("body")).toHaveScreenshot();
	});
});

test.describe("@a11y", () => {
	const paramsSet = new Set([
		new URLSearchParams(),
		new URLSearchParams("?_activeLink"),
	]);

	for (const params of paramsSet) {
		test(`Axe Page Scan: ?${params}`, async ({ page }) => {
			await page.goto(`/tests/icon-button?${params}`);

			const axe = new AxeBuilder({ page });
			const accessibilityScan = await axe.analyze();
			expect(accessibilityScan.violations).toEqual([]);
		});
	}
});
