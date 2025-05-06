/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { test, expect } from "#playwright";
import AxeBuilder from "@axe-core/playwright";

test("default", async ({ page }) => {
	await page.goto("/tests/dropdown-menu");

	const button = page.getByRole("button", { name: "Actions" });
	const add = page.getByRole("menuitem", { name: "Add" });
	const menu = page.getByRole("menu", { includeHidden: true });

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

test.describe("@visual", () => {
	test("default", async ({ page }) => {
		await page.goto("/tests/dropdown-menu?visual=true");
		await expect(page.locator("body")).toHaveScreenshot();
	});

	test("forced-colors", async ({ page, browserName }) => {
		test.skip(
			browserName === "webkit",
			"forced-colors does not appear correctly in Webkit",
		);
		await page.goto("/tests/dropdown-menu?visual=true");
		await page.emulateMedia({ forcedColors: "active" });
		await expect(page.locator("body")).toHaveScreenshot();
	});
});

test.describe("@a11y", () => {
	test("Axe Page Scan", async ({ page }) => {
		await page.goto("/tests/dropdown-menu");

		const button = page.getByRole("button", { name: "Actions" });
		const add = page.getByRole("menuitem", { name: "Add" });

		await expect(button).toBeVisible();

		await button.click();
		await expect(add).toBeVisible();

		const axe = new AxeBuilder({ page })
			.disableRules(["region"])
			.exclude("[data-focus-trap]");

		const accessibilityScan = await axe.analyze();
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

	test("@visual", async ({ page }) => {
		await page.goto("/tests/dropdown-menu?checkbox&defaultChecked");

		const button = page.getByRole("button", { name: "Settings" });
		await button.click();

		await expect(page.locator("body")).toHaveScreenshot();
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
