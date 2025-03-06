/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { test, expect } from "#playwright";
import AxeBuilder from "@axe-core/playwright";

const sizes = ["xsmall", "small", "medium", "large", "xlarge"] as const;

test.describe("default", () => {
	test("default", async ({ page }) => {
		for (const size of sizes) {
			for (const variant of ["text", "object"]) {
				await page.goto(`/tests/skeleton?variant=${variant}&size=${size}`);

				const skeleton = page.locator(".🥝-skeleton");

				await expect(skeleton).toHaveAttribute("data-kiwi-variant", variant);
				await expect(skeleton).toHaveAttribute("data-kiwi-size", size);
			}
		}
	});
});

test.describe("@visual", () => {
	test("default", async ({ page }) => {
		await page.goto("/tests/skeleton?visual");
		await expect(page.locator("body")).toHaveScreenshot();
	});
});

test.describe("@a11y", () => {
	test("Axe Page Scan", async ({ page }) => {
		await page.goto("/tests/skeleton");

		const axe = new AxeBuilder({ page });
		const accessibilityScan = await axe.analyze();
		expect(accessibilityScan.violations).toEqual([]);
	});
});
