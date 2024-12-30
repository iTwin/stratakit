/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { test, expect } from "#playwright";
import AxeBuilder from "@axe-core/playwright";

test("default", async ({ page }) => {
	await page.goto("/tests/tree");

	const tree = page.getByRole("list").first();
	await expect(tree).toBeVisible();

	const items = page.getByRole("listitem");
	await expect(items).toHaveCount(7);

	const expander = page.getByRole("button", { name: "Toggle" });

	const item1 = items.filter({
		has: page.getByText("Item 1", { exact: true }),
	});
	await expect(item1).toBeVisible();
	await expect(item1.locator(expander)).toHaveAttribute(
		"aria-expanded",
		"true",
	);

	const item1_1 = item1.getByRole("listitem").filter({
		has: page.getByText("Item 1.1"),
	});
	await expect(item1_1).toBeVisible();
	await expect(item1_1.locator(expander)).not.toBeVisible();
});

test.describe("@visual", () => {
	test("default", async ({ page }) => {
		await page.goto("/tests/tree");
		const tree = page.getByRole("list").first();
		await expect(tree).toBeVisible();
		await expect(page.locator("body")).toHaveScreenshot();
	});

	test("hovered item", async ({ page }) => {
		await page.goto("/tests/tree");

		const item = page.getByRole("button", { name: "Item 1.2" });
		item.hover();

		await expect(page.locator("body")).toHaveScreenshot();
	});

	test("focused item", async ({ page }) => {
		await page.goto("/tests/tree");

		const item = page.getByRole("button", { name: "Item 1.2" });
		item.focus();

		await expect(page.locator("body")).toHaveScreenshot();
	});

	test("overflow", async ({ page }) => {
		await page.goto("/tests/tree?overflow");
		const tree = page.getByRole("list").first();
		await expect(tree).toBeVisible();
		await expect(page.locator("body")).toHaveScreenshot();
	});

	test("selected", async ({ page }) => {
		await page.goto("/tests/tree?selected");
		const tree = page.getByRole("list").first();
		await expect(tree).toBeVisible();
		await expect(page.locator("body")).toHaveScreenshot();
	});

	test("visible actions", async ({ page }) => {
		await page.goto("/tests/tree?visibleActions");
		const tree = page.getByRole("list").first();
		await expect(tree).toBeVisible();
		await expect(page.locator("body")).toHaveScreenshot();
	});
});

test.describe("@a11y", () => {
	test("Axe Page Scan", async ({ page }) => {
		await page.goto("/tests/tree");

		const tree = page.getByRole("list").first();
		await expect(tree).toBeVisible();

		const axe = new AxeBuilder({ page });
		const accessibilityScan = await axe.analyze();
		expect(accessibilityScan.violations).toEqual([]);
	});
});
