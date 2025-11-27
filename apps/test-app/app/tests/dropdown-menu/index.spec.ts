/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "#playwright";

test("default", async ({ page }) => {
	await page.goto("/tests/dropdown-menu");

	const button = page.getByRole("button", { name: "Actions" });
	const add = page.getByRole("menuitem", { name: "Add" });
	const menu = page.getByRole("menu", { includeHidden: true }).first();

	await expect(button).not.toHaveAttribute("data-has-popover-open");
	await expect(menu).toHaveCount(0);

	await button.click();
	await expect(button).toHaveAttribute("data-has-popover-open");
	await expect(menu).toBeVisible();
	await expect(add).toBeVisible();

	await add.click();
	await expect(menu).toHaveCount(0); // unmounted
	await expect(add).not.toBeVisible();

	await button.click();
	await expect(menu).toBeVisible();
	await expect(add).toBeVisible();

	await page.click("body");
	await expect(menu).toHaveCount(0); // unmounted
	await expect(add).not.toBeVisible();
});

test("default (keyboard)", async ({ page }) => {
	await page.goto("/tests/dropdown-menu");

	const button = page.getByRole("button", { name: "Actions" });
	const add = page.getByRole("menuitem", { name: "Add" });
	const edit = page.getByRole("menuitem", { name: "Edit" });
	const del = page.getByRole("menuitem", { name: "Delete" });
	const disable = page.getByRole("menuitem", { name: "Disable" });

	await expect(button).toBeVisible();
	await expect(button).not.toHaveAttribute("data-has-popover-open");

	await page.keyboard.press("Tab");
	await expect(button).toBeFocused();

	await page.keyboard.press("Enter");
	await expect(button).toHaveAttribute("data-has-popover-open");
	await expect(add).toBeFocused();

	await page.keyboard.press("ArrowDown");
	await expect(edit).toBeFocused();

	await expect(del).toBeDisabled();
	await page.keyboard.press("ArrowDown");
	await expect(del).toBeFocused();

	await page.keyboard.press("ArrowDown");
	await expect(disable).toBeFocused();

	await page.keyboard.press("Enter");
	await expect(add).not.toBeVisible();
	await expect(button).toBeFocused();

	await page.keyboard.press("Enter");
	await expect(add).toBeVisible();

	await page.keyboard.press("Escape");
	await expect(add).not.toBeVisible();
	await expect(button).toBeFocused();
});

test("disabled", async ({ page }) => {
	await page.goto("/tests/dropdown-menu?disabled=true");

	const button = page.getByRole("button", { name: "Actions" });
	const add = page.getByRole("menuitem", { name: "Add" });

	await expect(button).toBeDisabled();

	await page.keyboard.press("Tab");
	await expect(button).toBeFocused();

	await page.keyboard.press("Enter");
	await expect(add).not.toBeVisible();

	await page.keyboard.press("ArrowDown");
	await expect(add).not.toBeVisible();

	await button.click({ force: true });
	await expect(add).not.toBeVisible();
});

test("shortcuts", async ({ page }) => {
	await page.goto("/tests/dropdown-menu");

	const button = page.getByRole("button", { name: "Actions" });

	await button.click();

	const add = page.getByRole("menuitem", { name: "Add" });
	const addingShortcut = add.locator("kbd");
	await expect(addingShortcut.nth(0)).toMatchAriaSnapshot("- text: Command");
	await expect(addingShortcut.nth(1)).toHaveText("A");

	const edit = page.getByRole("menuitem", { name: "Edit" });
	const editShortcut = edit.locator("kbd");
	await expect(editShortcut.nth(0)).toMatchAriaSnapshot("- text: Shift");
	await expect(editShortcut.nth(1)).toHaveText("E");
});

test("dot", async ({ page }) => {
	await page.goto("/tests/dropdown-menu");

	const button = page.getByRole("button", { name: "Actions" });
	await button.click();

	const filterItem = page.getByRole("menuitem", { name: "Filter" });
	await expect(filterItem).toHaveAccessibleDescription("Some filters applied");
});

test.describe("submenu", () => {
	test("open on hover", async ({ page, browserName }) => {
		test.skip(
			browserName === "webkit",
			"hover does not open a menu in Webkit tests",
		);

		await page.goto("/tests/dropdown-menu?submenu");

		const button = page.getByRole("button", { name: "Actions" });
		const allMenus = page.getByRole("menu", { includeHidden: true });
		const visibleMenus = page.getByRole("menu", { includeHidden: false });
		const item1 = page.getByRole("menuitem", { name: "Item 1" });
		const item3 = page.getByRole("menuitem", { name: "Item 3", exact: true });
		const item3_1 = page.getByRole("menuitem", { name: "Item 3_1" });

		await expect(allMenus).toHaveCount(0);

		await button.click();
		await expect(visibleMenus).toHaveCount(1);
		await expect(button).toHaveAttribute("data-has-popover-open");
		await expect(item1).toBeVisible();

		await item3.hover();
		await expect(visibleMenus).toHaveCount(2);
		await expect(item3).toHaveAttribute("data-has-popover-open");
		await expect(item3_1).toBeVisible();

		await item3_1.hover();
		await expect(item3_1).toBeVisible();
	});

	test("close on hover away", async ({ page, browserName }) => {
		test.skip(
			browserName === "webkit",
			"hover does not open a menu in Webkit tests",
		);

		await page.goto("/tests/dropdown-menu?submenu");

		const button = page.getByRole("button", { name: "Actions" });
		const menu = page.getByRole("menu");
		const item3 = page.getByRole("menuitem", { name: "Item 3", exact: true });

		await button.click();
		await item3.hover();
		await expect(menu).toHaveCount(2);
		await expect(item3).toHaveAttribute("data-has-popover-open");

		await page.locator("body").hover();
		await expect(menu).toHaveCount(1);
		await expect(item3).not.toHaveAttribute("data-has-popover-open");
	});

	test("open on click", async ({ page }) => {
		await page.goto("/tests/dropdown-menu?submenu");

		const button = page.getByRole("button", { name: "Actions" });
		const menu = page.getByRole("menu");
		const item1 = page.getByRole("menuitem", { name: "Item 1" });
		const item3 = page.getByRole("menuitem", { name: "Item 3", exact: true });
		const item3_1 = page.getByRole("menuitem", { name: "Item 3_1" });

		await expect(menu).toHaveCount(0);

		await button.click();
		await expect(menu).toHaveCount(1);
		await expect(button).toHaveAttribute("data-has-popover-open");
		await expect(item1).toBeVisible();

		await item3.click();
		await expect(menu).toHaveCount(2);
		await expect(item3).toHaveAttribute("data-has-popover-open");
		await expect(item3_1).toBeVisible();

		await item3_1.click();
		await expect(menu).toHaveCount(0);
		await expect(button).toBeFocused();
	});

	test("keyboard", async ({ page }) => {
		await page.goto("/tests/dropdown-menu?submenu");

		const button = page.getByRole("button", { name: "Actions" });
		const menu = page.getByRole("menu");
		const item1 = page.getByRole("menuitem", { name: "Item 1" });
		const item2 = page.getByRole("menuitem", { name: "Item 2" });
		const item3 = page.getByRole("menuitem", { name: "Item 3", exact: true });
		const item3_1 = page.getByRole("menuitem", { name: "Item 3_1" });
		const item3_2 = page.getByRole("menuitem", {
			name: "Item 3_2",
			exact: true,
		});
		const item3_3 = page.getByRole("menuitem", { name: "Item 3_3" });
		const item3_2_1 = page.getByRole("menuitem", { name: "Item 3_2_1" });
		const item3_2_2 = page.getByRole("menuitem", { name: "Item 3_2_2" });

		await expect(menu).toHaveCount(0);

		await page.keyboard.press("Tab");
		await expect(button).toBeFocused();

		await page.keyboard.press("Enter");
		await expect(menu).toHaveCount(1);
		await expect(button).toHaveAttribute("data-has-popover-open");
		await expect(item1).toBeFocused();

		await page.keyboard.press("ArrowDown");
		await expect(item2).toBeFocused();

		await page.keyboard.press("ArrowDown");
		await expect(item3).toBeFocused();

		await page.keyboard.press("ArrowRight");
		await expect(menu).toHaveCount(2);
		await expect(item3).toHaveAttribute("data-has-popover-open");
		await expect(item3_1).toBeFocused();

		await page.keyboard.press("ArrowDown");
		await expect(item3_2).toBeFocused();

		await page.keyboard.press("ArrowRight");
		await expect(menu).toHaveCount(3);
		await expect(item3_2).toHaveAttribute("data-has-popover-open");
		await expect(item3_2_1).toBeFocused();

		await page.keyboard.press("ArrowDown");
		await expect(item3_2_2).toBeFocused();

		await page.keyboard.press("ArrowLeft");
		await expect(menu).toHaveCount(2);
		await expect(item3_2_1).toBeHidden();
		await expect(item3_2).toBeFocused();

		await page.keyboard.press("ArrowDown");
		await expect(item3_3).toBeFocused();

		await page.keyboard.press("Escape");
		await expect(menu).toHaveCount(0);
		await expect(item1).not.toBeVisible();
		await expect(button).toBeFocused();
	});
});

test.describe("@visual", () => {
	test("default", async ({ page }) => {
		await page.goto("/tests/dropdown-menu?visual");

		const settings = page.getByRole("menuitem", { name: "Settings" });
		await settings.click();

		await expect(page.locator("body")).toHaveScreenshot();
	});

	test("forced-colors", async ({ page, browserName }) => {
		test.skip(
			browserName === "webkit",
			"forced-colors does not appear correctly in Webkit",
		);
		await page.goto("/tests/dropdown-menu?visual");
		await page.emulateMedia({ forcedColors: "active" });

		const settings = page.getByRole("menuitem", { name: "Settings" });
		await settings.click();

		await expect(page.locator("body")).toHaveScreenshot();
	});
});

test.describe("@a11y", () => {
	test("Axe Page Scan", async ({ page }) => {
		await page.goto("/tests/dropdown-menu");

		const button = page.getByRole("button", { name: "Actions" });
		const more = page.getByRole("menuitem", { name: "More" });
		const clone = page.getByRole("menuitem", { name: "Clone" });

		await expect(button).toBeVisible();

		await button.click();
		await expect(more).toBeVisible();

		const axe = new AxeBuilder({ page })
			.disableRules(["region"])
			.exclude("[data-focus-trap]");

		let accessibilityScan = await axe.analyze();
		expect(accessibilityScan.violations).toEqual([]);

		await more.click();
		await expect(clone).toBeVisible();

		accessibilityScan = await axe.analyze();
		expect(accessibilityScan.violations).toEqual([]);
	});
});

test.describe("DropdownMenu.CheckboxItem", () => {
	test("default", async ({ page }) => {
		await page.goto("/tests/dropdown-menu?checkbox");

		const button = page.getByRole("button", { name: "Settings" });
		const item1 = page.getByRole("menuitemcheckbox", { name: "Item 1" });

		await button.click();
		await expect(item1).toHaveAttribute("aria-checked", "false");

		await item1.click();
		await expect(item1).toHaveAttribute("aria-checked", "true");

		await page.click("body");
		await expect(item1).toBeHidden();

		await button.click();
		await expect(item1).toHaveAttribute("aria-checked", "true");
	});

	test("defaultChecked", async ({ page }) => {
		await page.goto("/tests/dropdown-menu?checkbox&defaultChecked");

		const button = page.getByRole("button", { name: "Settings" });
		const item3 = page.getByRole("menuitemcheckbox", { name: "Item 3" });

		await button.click();
		await expect(item3).toHaveAttribute("aria-checked", "true");

		await item3.click();
		await expect(item3).toHaveAttribute("aria-checked", "false");
	});

	test.describe("@a11y", () => {
		test("Axe Page Scan", async ({ page }) => {
			await page.goto("/tests/dropdown-menu?checkbox&defaultChecked");

			const button = page.getByRole("button", { name: "Settings" });
			await button.click();

			const item3 = page.getByRole("menuitemcheckbox", { name: "Item 3" });
			await expect(item3).toHaveAttribute("aria-checked", "true");

			const axe = new AxeBuilder({ page });
			const accessibilityScan = await axe
				.disableRules(["region"])
				.exclude("[data-focus-trap]")
				.analyze();
			expect(accessibilityScan.violations).toEqual([]);
		});
	});
});

test.describe("DropdownMenu.Group", () => {
	test("default", async ({ page }) => {
		await page.goto("/tests/dropdown-menu?group");

		const button = page.getByRole("button", { name: "Actions" });
		const group1 = page.getByRole("group", { name: "Group 1" });
		const group1Items = group1.getByRole("menuitem");
		const item1 = group1.getByRole("menuitem", { name: "Item 1" });

		await button.click();
		await expect(group1).toBeVisible();
		await expect(group1Items).toHaveCount(2);
		await expect(item1).toBeVisible();
	});

	test.describe("@a11y", () => {
		test("Axe Page Scan", async ({ page }) => {
			await page.goto("/tests/dropdown-menu?group");

			const button = page.getByRole("button", { name: "Actions" });
			await button.click();

			const axe = new AxeBuilder({ page });
			const accessibilityScan = await axe
				.disableRules(["region"])
				.exclude("[data-focus-trap]")
				.analyze();
			expect(accessibilityScan.violations).toEqual([]);
		});
	});
});
