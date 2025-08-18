/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "#playwright";

test("default", async ({ page }) => {
	await page.goto("/tests/accordion-item");

	const button = page.getByTestId("button");
	const content = page.getByTestId("content");

	await expect(button).toMatchAriaSnapshot(`
		- button "Label" [expanded=false]
	`);
	await expect(content).not.toBeVisible();

	button.click();

	await expect(button).toMatchAriaSnapshot(`
		- button "Label" [expanded=true]
	`);
	await expect(content).toBeVisible();
});

test.describe("@visual", () => {
	test("default", async ({ page }) => {
		await page.goto("/tests/accordion-item?visual");
		await expect(page.locator("body")).toHaveScreenshot();
	});

	test("hovered closed item", async ({ page }) => {
		await page.goto("/tests/accordion-item");

		const item = page.getByRole("button", { name: "Label" });
		item.hover();

		await expect(page.locator("body")).toHaveScreenshot();
	});

	test("hovered open item", async ({ page }) => {
		await page.goto("/tests/accordion-item?defaultOpen");

		const item = page.getByRole("button", { name: "Label" });
		item.hover();

		await expect(page.locator("body")).toHaveScreenshot();
	});

	test("focused closed item", async ({ page }) => {
		await page.goto("/tests/accordion-item");

		const item = page.getByRole("button", { name: "Label" });
		item.focus();

		await expect(page.locator("body")).toHaveScreenshot();
	});

	test("focused open item", async ({ page }) => {
		await page.goto("/tests/accordion-item?defaultOpen");

		const item = page.getByRole("button", { name: "Label" });
		item.focus();

		await expect(page.locator("body")).toHaveScreenshot();
	});

	/*
	test("forced-colors", async ({ page, browserName }) => {
		test.skip(
			browserName === "webkit",
			"Webkit does not support forced-colors",
		);
		await page.goto("/tests/accordion?visual");
		await page.emulateMedia({ forcedColors: "active" });
		await expect(page.locator("body")).toHaveScreenshot();
	});
  */
});

test.describe("@a11y", () => {
	const paramsSet = new Set([
		new URLSearchParams(),
		new URLSearchParams("?visual"),
		new URLSearchParams("?defaultOpen"),
	]);

	for (const params of paramsSet) {
		test(`Axe Page Scan: ?${params}`, async ({ page }) => {
			await page.goto(`/tests/accordion-item?${params}`);

			const axe = new AxeBuilder({ page });
			let accessibilityScan = await axe.analyze();
			await expect(accessibilityScan.violations).toEqual([]);

			// Skip the trigger test for the visual route
			if (params.has("visual")) return;

			const button = page.getByRole("button", { name: "Label" });
			await button.click();

			accessibilityScan = await axe.analyze();
			await expect(accessibilityScan.violations).toEqual([]);
		});
	}
});
