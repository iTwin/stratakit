/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { test, expect } from "#playwright";
import AxeBuilder from "@axe-core/playwright";

const textSizes = [
	"xsmall",
	"small",
	"medium",
	"large",
	"xlarge",
	"xxlarge",
] as const;
const objectSizes = ["xsmall", "small", "medium", "large", "xlarge"] as const;
const objectShapes = ["square", "pill", "circle"] as const;

test.describe("default", () => {
	test("text variant", async ({ page }) => {
		for (const size of textSizes) {
			await page.goto(`/tests/skeleton?variant=text&size=${size}`);

			const skeleton = page.locator(".🥝-skeleton");
			const skeletonItem = page.locator(".🥝-skeleton-item");

			await expect(skeleton).toHaveText("Loading…");

			await expect(skeletonItem).toHaveAttribute("data-kiwi-variant", "text");
			await expect(skeletonItem).toHaveAttribute("data-kiwi-size", size);
			await expect(skeletonItem).not.toHaveAttribute("data-kiwi-shape");
		}
	});

	test("object variant", async ({ page }) => {
		for (const size of objectSizes) {
			for (const shape of objectShapes) {
				await page.goto(
					`/tests/skeleton?variant=object&size=${size}&shape=${shape}`,
				);

				const skeleton = page.locator(".🥝-skeleton");
				const skeletonItem = page.locator(".🥝-skeleton-item");

				await expect(skeleton).toHaveText("Loading…");

				await expect(skeletonItem).toHaveAttribute(
					"data-kiwi-variant",
					"object",
				);
				await expect(skeletonItem).toHaveAttribute("data-kiwi-size", size);
				await expect(skeletonItem).toHaveAttribute("data-kiwi-shape", shape);
			}
		}
	});

	test("custom alt", async ({ page }) => {
		await page.goto("/tests/skeleton?alt=Custom alt");

		const skeleton = page.locator(".🥝-skeleton");
		await expect(skeleton).toHaveText("Custom alt");
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
