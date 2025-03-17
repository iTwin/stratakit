/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { test, expect } from "#playwright";
import AxeBuilder from "@axe-core/playwright";

test("default", async ({ page }) => {
	await page.goto("/tests/divider");
	const divider = page.getByRole("separator");
	await expect(divider).toHaveAttribute("aria-orientation", "horizontal");
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

test.describe("@visual", () => {
	test("default", async ({ page }) => {
		await page.goto("/tests/divider?visual=true");
		await expect(page.locator("body")).toHaveScreenshot();
	});

	test("forced-colors", async ({ page, browserName }) => {
		test.skip(
			browserName === "webkit",
			"Webkit does not support forced-colors",
		);
		await page.goto("/tests/divider?visual=true");
		await page.emulateMedia({ forcedColors: "active" });
		await expect(page.locator("body")).toHaveScreenshot();
	});
});

test.describe("@a11y", () => {
	test("Axe Page Scan", async ({ page }) => {
		await page.goto("/tests/divider");

		const divider = page.getByRole("separator");
		await expect(divider).toBeVisible();

		const axe = new AxeBuilder({ page });
		const accessibilityScan = await axe.analyze();
		expect(accessibilityScan.violations).toEqual([]);
	});
});
