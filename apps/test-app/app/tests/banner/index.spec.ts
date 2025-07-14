/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "#playwright";

test("default", async ({ page }) => {
	await page.goto("/tests/banner");

	const banner = page.locator(".🥝-banner").first();
	await expect(banner).toBeVisible();
});

test("dismiss", async ({ page }) => {
	await page.goto("/tests/banner?dismiss=true");

	const banners = page.locator(".🥝-banner");
	await expect(banners).toHaveCount(3);

	// Dismiss button should not exist
	await expect(banners.nth(0).locator("button")).not.toBeVisible();

	// Dismiss button's accessible name should be "Dismiss Label" since label="Label"
	// regardless of if the label is visually hidden (i=2) or not (i=1).
	for (let i = 1; i < 3; i++) {
		await expect(banners.nth(i).locator("button")).toBeVisible();
		await expect(banners.nth(i).locator("button")).toHaveAccessibleName(
			"Dismiss Label",
		);
	}
});

test.describe("appropriately show custom or default icon", () => {
	test("Composition API: if no href is passed to Banner.Icon and tone is non-neutral, default status icon is shown. Else the custom icon is shown", async ({
		page,
	}) => {
		await page.goto("/tests/banner?composition=true");

		// If custom icon is passed, it is shown
		const bannerInfoWithCustomIcon = page.getByTestId(
			"banner-info-custom-icon",
		);

		await expect(bannerInfoWithCustomIcon).toBeVisible();
		await expect(
			bannerInfoWithCustomIcon.locator(".my-banner-icon use"),
		).toBeVisible();
		await expect(
			bannerInfoWithCustomIcon.locator(".my-banner-icon path"),
		).not.toBeVisible();

		// When no custom icon but non-neutral status, default status icon is shown
		const bannerInfoWithNoCustomIcon = page.getByTestId(
			"banner-info-no-custom-icon",
		);

		await expect(bannerInfoWithNoCustomIcon).toBeVisible();
		await expect(
			bannerInfoWithNoCustomIcon.locator(".my-banner-icon use"),
		).not.toBeVisible();
		await expect(
			bannerInfoWithNoCustomIcon.locator(".my-banner-icon path"),
		).toBeVisible();

		// When no custom icon and neutral status, no icon is shown
		const bannerNeutralWithNoCustomIcon = page.getByTestId(
			"banner-neutral-no-custom-icon",
		);

		await expect(bannerNeutralWithNoCustomIcon).toBeVisible();
		await expect(
			bannerNeutralWithNoCustomIcon.locator(".my-banner-icon"),
		).not.toBeVisible();
	});

	test("Convenience API: if no icon is passed to Banner and tone is non-neutral, default status icon is shown. Else the custom icon is shown", async ({
		page,
	}) => {
		// If custom icon is passed, it is shown
		await page.goto("/tests/banner?tone=info&icon=true");
		const bannerInfoWithCustomIcon = page.locator(".my-banner");

		await expect(bannerInfoWithCustomIcon).toBeVisible();
		await expect(bannerInfoWithCustomIcon.locator("svg use")).toBeVisible();
		await expect(
			bannerInfoWithCustomIcon.locator("svg path"),
		).not.toBeVisible();

		// When no custom icon but non-neutral status, default status icon is shown
		await page.goto("/tests/banner?tone=info");
		const bannerInfoWithNoCustomIcon = page.locator(".🥝-banner");

		await expect(bannerInfoWithNoCustomIcon).toBeVisible();
		await expect(
			bannerInfoWithNoCustomIcon.locator("svg use"),
		).not.toBeVisible();
		await expect(bannerInfoWithNoCustomIcon.locator("svg path")).toBeVisible();

		// When no custom icon and neutral status, no icon is shown
		await page.goto("/tests/banner");
		const bannerNeutralWithNoCustomIcon = page.locator(".🥝-banner");

		await expect(bannerNeutralWithNoCustomIcon).toBeVisible();
		await expect(
			bannerNeutralWithNoCustomIcon.locator("svg"),
		).not.toBeVisible();
	});
});

test.describe("@visual", () => {
	test("default", async ({ page }) => {
		await page.goto("/tests/banner?visual=true");
		await expect(page.locator("body")).toHaveScreenshot();
	});

	test("forced-colors", async ({ page, browserName }) => {
		test.skip(
			browserName === "webkit",
			"Webkit does not support forced-colors",
		);
		await page.goto("/tests/banner?visual=true");
		await page.emulateMedia({ forcedColors: "active" });
		await expect(page.locator("body")).toHaveScreenshot();
	});
});

test.describe("@a11y", () => {
	test("Axe Page Scan", async ({ page }) => {
		await page.goto("/tests/banner");

		const banner = page.locator(".🥝-banner").first();
		await expect(banner).toBeVisible();

		const axe = new AxeBuilder({ page });
		const accessibilityScan = await axe.analyze();
		expect(accessibilityScan.violations).toEqual([]);
	});
});
