/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "#playwright";

test("default", async ({ page }) => {
	await page.goto("/tests/navigation-rail");

	const navigationRail = page.getByRole("navigation");
	await expect(navigationRail).toBeVisible();
});

test.describe("expansion", () => {
	for (const type of ["uncontrolled", "controlled"] as const) {
		test(`expansion (${type})`, async ({ page }) => {
			const params = type === "controlled" ? "?_controlled" : "";
			await page.goto(`/tests/navigation-rail${params}`);

			const toggleButton = page.getByRole("button", { name: "Expand" });
			await expect(toggleButton).toHaveAccessibleName("Expand navigation");
			await expect(toggleButton).toHaveAttribute("aria-expanded", "false");

			await toggleButton.click();
			await expect(toggleButton).toHaveAttribute("aria-expanded", "true");
		});

		test(`defaultExpanded (${type})`, async ({ page }) => {
			let params = "?defaultExpanded";
			if (type === "controlled") params += "&_controlled";
			await page.goto(`/tests/navigation-rail${params}`);

			const toggleButton = page.getByRole("button", { name: "Expand" });
			await expect(toggleButton).toHaveAttribute("aria-expanded", "true");
		});
	}
});

test.describe("@visual", () => {
	test("default", async ({ page }) => {
		await page.goto("/tests/navigation-rail?visual");
		await expect(page.locator("body")).toHaveScreenshot();

		const toggleButton = page.getByRole("button", { name: "Expand" });
		await toggleButton.click();
		await expect(page.locator("body")).toHaveScreenshot();
	});

	test("forced-colors", async ({ page, browserName }) => {
		test.skip(
			browserName === "webkit",
			"Webkit does not support forced-colors",
		);
		await page.goto("/tests/navigation-rail?visual");
		await page.emulateMedia({ forcedColors: "active" });
		await expect(page.locator("body")).toHaveScreenshot();
	});
});

test.describe("@a11y", () => {
	test("Axe Page Scan", async ({ page }) => {
		await page.goto("/tests/navigation-rail");

		const axe = new AxeBuilder({ page });
		let accessibilityScan = await axe.analyze();
		expect(accessibilityScan.violations).toEqual([]);

		const toggleButton = page.getByRole("button", { name: "Expand" });
		await toggleButton.click();
		accessibilityScan = await axe.analyze();
		expect(accessibilityScan.violations).toEqual([]);
	});
});
