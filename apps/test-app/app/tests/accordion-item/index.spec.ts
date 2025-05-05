/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "#playwright";

test("default", async ({ page }) => {
	await page.goto("/tests/accordion-item");

	const trigger = page.getByTestId("trigger");
	const content = page.getByTestId("content");

	await expect(trigger).toMatchAriaSnapshot(`
		- button "Label" [expanded=false]
	`);
	await expect(content).not.toBeVisible();

	trigger.click();

	await expect(trigger).toMatchAriaSnapshot(`
		- button "Label" [expanded=true]
	`);
	await expect(content).toBeVisible();
});

test.describe("@visual", () => {
	test("default", async ({ page }) => {
		await page.goto("/tests/accordion-item?visual");
		await expect(page.locator("body")).toHaveScreenshot();
	});

	test("hovered collapsed item", async ({ page }) => {
		await page.goto("/tests/accordion-item");

		const item = page.getByRole("button", { name: "Label" });
		item.hover();

		await expect(page.locator("body")).toHaveScreenshot();
	});

	test("hovered expanded item", async ({ page }) => {
		await page.goto("/tests/accordion-item?defaultOpen");

		const item = page.getByRole("button", { name: "Label" });
		item.hover();

		await expect(page.locator("body")).toHaveScreenshot();
	});

	test("focused collapsed item", async ({ page }) => {
		await page.goto("/tests/accordion-item");

		const item = page.getByRole("button", { name: "Label" });
		item.focus();

		await expect(page.locator("body")).toHaveScreenshot();
	});

	test("focused expanded item", async ({ page }) => {
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
	test("Axe Page Scan", async ({ page }) => {
		await page.goto("/tests/accordion-item");

		const axe = new AxeBuilder({ page });
		let accessibilityScan = await axe.analyze();
		await expect(accessibilityScan.violations).toEqual([]);

		const trigger = page.getByRole("button", { name: "Label" });
		await trigger.click();

		accessibilityScan = await axe.analyze();
		await expect(accessibilityScan.violations).toEqual([]);
	});
});
