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

test.describe("@visual", () => {
	test("default", async ({ page }) => {
		await page.goto("/tests/banner?visual=true");
		await expect(page.locator("body")).toHaveScreenshot();
	});

	(
		[
			{ api: "convenience", tone: "neutral", result: "no icon is shown" },
			{ api: "composition", tone: "neutral", result: "no icon is shown" },
			{
				api: "convenience",
				tone: "non-neutral",
				result: "status icon is shown",
			},
			{
				api: "composition",
				tone: "non-neutral",
				result: "status icon is shown",
			},
		] as const
	).forEach(({ tone, result, api }) => {
		test(`if no icon is passed and tone is ${tone}, ${result}. (${api} API})`, async ({
			page,
		}) => {
			if (api === "convenience") {
				await page.goto(`/tests/banner?visual=true`);
			} else {
				await page.goto(`/tests/banner?composition=true`);
			}
			const banner =
				tone === "neutral"
					? page.getByTestId("banner-neutral")
					: page.getByTestId("banner-info");

			await expect(banner).toBeVisible();

			if (result === "no icon is shown") {
				await expect(banner.locator(".🥝-banner-icon")).not.toBeVisible();
			} else {
				await expect(banner.locator(".🥝-banner-icon")).toBeVisible();
			}
		});
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
