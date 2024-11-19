/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { test, expect } from "@playwright/test";

test("default", async ({ page }) => {
	await page.goto("/tests/tree");

	const tree = page.getByRole("tree");
	await expect(tree).toBeVisible();

	const items = page.getByRole("treeitem");
	await expect(items).toHaveCount(7);

	const item1 = page.getByRole("treeitem", { name: /Item 1$/ });
	await expect(item1).toHaveAttribute("aria-expanded", "true");

	const item1_1 = page.getByRole("treeitem", { name: "Item 1.1" });
	await expect(item1_1).not.toHaveAttribute("aria-expanded", "true");
});
