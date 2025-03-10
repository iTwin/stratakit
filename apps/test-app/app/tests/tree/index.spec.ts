/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { test, expect } from "#playwright";
import AxeBuilder from "@axe-core/playwright";

test("default", async ({ page }) => {
	await page.goto("/tests/tree");

	const tree = page.getByRole("tree");
	await expect(tree).toBeVisible();

	const items = page.getByRole("treeitem");
	await expect(items).toHaveCount(7);

	const item1 = items.filter({
		has: page.getByText("Item 1", { exact: true }),
	});
	await expect(item1).toBeVisible();
	await expect(item1).toHaveAttribute("aria-expanded", "true");
	await expect(item1).toHaveAttribute("aria-level", "1");
	await expect(item1).toHaveAttribute("aria-posinset", "1");
	await expect(item1).toHaveAttribute("aria-setsize", "3");

	const item1_1 = items.filter({
		has: page.getByText("Item 1.1"),
	});
	await expect(item1_1).toBeVisible();
	await expect(item1_1).not.toHaveAttribute("aria-expanded");
	await expect(item1_1).toHaveAttribute("aria-level", "2");
	await expect(item1_1).toHaveAttribute("aria-posinset", "1");
	await expect(item1_1).toHaveAttribute("aria-setsize", "3");
});

test("actions", async ({ page, browserName }) => {
	test.fixme(
		browserName === "firefox",
		"This fails here but works in Firefox (manual)",
	);

	await page.goto("/tests/tree");

	const item1_1 = page.getByRole("treeitem", { name: "Item 1.1" });
	const item1_2 = page.getByRole("treeitem", { name: "Item 1.2" });
	const toolbar1_1 = item1_1.getByRole("toolbar");

	await expect(toolbar1_1).not.toBeVisible();

	// Hover to show actions
	await item1_1.hover();
	await expect(toolbar1_1).toBeVisible();

	// Hover away to hide actions
	await item1_2.hover();
	await expect(toolbar1_1).not.toBeVisible();
});

test("description", async ({ page }) => {
	await page.goto("/tests/tree?description");

	const item1_1 = page.getByRole("treeitem").filter({
		has: page.getByText("Item 1.1"),
	});
	await expect(item1_1).toHaveAccessibleDescription("Additional description");
});

test("decoration as description", async ({ page }) => {
	await page.goto("/tests/tree");

	const item1 = page.getByRole("treeitem").filter({
		has: page.getByText("Item 1", { exact: true }),
	});
	await expect(item1).toHaveAccessibleDescription("decoration");
});

test("description and decoration as description", async ({ page }) => {
	await page.goto("/tests/tree?description");

	const item1 = page.getByRole("treeitem").filter({
		has: page.getByText("Item 1", { exact: true }),
	});
	await expect(item1).toHaveAccessibleDescription(
		"Additional description decoration",
	);
});

test.describe("keyboard", () => {
	test("navigation and expansion", async ({ page }) => {
		await page.goto("/tests/tree");

		const tree = page.getByRole("tree");
		const items = tree.getByRole("treeitem");

		const item1 = items.filter({
			has: page.getByText("Item 1", { exact: true }),
		});
		const item1_1 = items.filter({
			has: page.getByText("Item 1.1"),
		});
		const item2 = items.filter({
			has: page.getByText("Item 2", { exact: true }),
		});
		const item3 = items.filter({
			has: page.getByText("Item 3", { exact: true }),
		});

		await expect(tree).toBeVisible();

		// Initial: Item 1
		await page.keyboard.press("Tab");
		await expect(item1).toBeFocused();
		await expect(item1).toHaveAttribute("aria-expanded", "true");

		// ⬇️ Item 1.1
		await page.keyboard.press("ArrowDown");
		await expect(item1_1).toBeFocused();

		// ⬆️ Item 1
		await page.keyboard.press("ArrowUp");
		await expect(item1).toBeFocused();

		// ⬅️ Collapse
		await page.keyboard.press("ArrowLeft");
		await expect(item1).toHaveAttribute("aria-expanded", "false");

		// ⬇️ Item 2
		await page.keyboard.press("ArrowDown");
		await expect(item2).toBeFocused();
		await expect(item2).toHaveAttribute("aria-expanded", "true");

		// ⬅️ Collapse
		await page.keyboard.press("ArrowLeft");
		await expect(item2).toHaveAttribute("aria-expanded", "false");

		// ➡️ Expand
		await page.keyboard.press("ArrowRight");
		await expect(item2).toHaveAttribute("aria-expanded", "true");

		// End: Item 3
		await page.keyboard.press("End");
		await expect(item3).toBeFocused();

		// End: Item 1
		await page.keyboard.press("Home");
		await expect(item1).toBeFocused();
	});

	test("selection", async ({ page }) => {
		await page.goto("/tests/tree");

		const tree = page.getByRole("tree");
		const item1 = tree.getByRole("treeitem").filter({
			has: page.getByText("Item 1", { exact: true }),
		});

		// Initial: Unselected
		await page.keyboard.press("Tab");
		await expect(item1).toBeFocused();
		await expect(item1).toHaveAttribute("aria-selected", "false");

		// Space: Select
		await page.keyboard.press("Space");
		await expect(item1).toHaveAttribute("aria-selected", "true");

		// Enter: Deselect
		await page.keyboard.press("Enter");
		await expect(item1).toHaveAttribute("aria-selected", "false");
	});

	test("actions", async ({ page }) => {
		test.fixme();

		await page.goto("/tests/tree");

		const item1 = page.getByRole("treeitem", { name: "Item 1", exact: true });
		const item1_1 = page.getByRole("treeitem", { name: "Item 1.1" });
		const toolbar1_1 = item1_1.getByRole("toolbar");
		const toolbar1_1Actions = toolbar1_1.getByRole("button");

		await expect(toolbar1_1).not.toBeVisible();

		// Initial: Tab to enter tree
		await page.keyboard.press("Tab");
		await expect(item1).toBeFocused();

		// ⬇️ focus Item 1.1
		await page.keyboard.press("ArrowDown");
		await expect(item1_1).toBeFocused();

		// Tab: focus first action within Item 1.1
		await page.keyboard.press("Tab");
		await page.waitForTimeout(100);
		await expect(toolbar1_1).toBeVisible();
		await page.waitForTimeout(100);
		await expect(toolbar1_1Actions).toHaveCount(2);
		await expect(toolbar1_1Actions.first()).toBeFocused();

		// ➡️ focus next action within Item 1.1
		await page.keyboard.press("ArrowRight");
		await expect(toolbar1_1Actions.last()).toBeFocused();
	});
});

test.describe("@visual", () => {
	test("default", async ({ page }) => {
		await page.goto("/tests/tree");
		const tree = page.getByRole("tree");
		await expect(tree).toBeVisible();
		await expect(page.locator("body")).toHaveScreenshot();
	});

	test("hovered item", async ({ page }) => {
		await page.goto("/tests/tree");

		const item = page.getByRole("treeitem", { name: "Item 1.2" });
		item.hover();

		await expect(page.locator("body")).toHaveScreenshot();
	});

	test("focused item", async ({ page }) => {
		await page.goto("/tests/tree");

		const item = page.getByRole("treeitem", { name: "Item 1.2" });
		item.focus();

		await expect(page.locator("body")).toHaveScreenshot();
	});

	test("overflow", async ({ page }) => {
		await page.goto("/tests/tree?overflow");
		const tree = page.getByRole("tree");
		await expect(tree).toBeVisible();
		await expect(page.locator("body")).toHaveScreenshot();
	});

	test("selected", async ({ page }) => {
		await page.goto("/tests/tree?selected");
		const tree = page.getByRole("tree");
		await expect(tree).toBeVisible();
		await expect(page.locator("body")).toHaveScreenshot();
	});

	test("description", async ({ page }) => {
		await page.goto("/tests/tree?description");
		const tree = page.getByRole("tree");
		await expect(tree).toBeVisible();
		await expect(page.locator("body")).toHaveScreenshot();
	});
});

test.describe("@a11y", () => {
	test("Axe Page Scan", async ({ page }) => {
		await page.goto("/tests/tree");

		const tree = page.getByRole("tree");
		await expect(tree).toBeVisible();

		const axe = new AxeBuilder({ page });
		const accessibilityScan = await axe.analyze();
		expect(accessibilityScan.violations).toEqual([]);
	});
});
