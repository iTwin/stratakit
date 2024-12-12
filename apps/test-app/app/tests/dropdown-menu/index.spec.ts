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
	await expect(menu).toHaveCount(0);

	await button.click();
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

	await page.keyboard.press("Tab");
	await expect(button).toBeFocused();

	await page.keyboard.press("Enter");
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
	await expect(addingShortcut).toHaveText("⌘A");

	const edit = page.getByRole("menuitem", { name: "Edit" });
	const editShortcut = edit.locator("kbd");
	await expect(editShortcut.nth(0)).toHaveText("⇧");
	await expect(editShortcut.nth(1)).toHaveText("E");
});

test("@visual", async ({ page }) => {
	await page.goto("/tests/dropdown-menu?visual=true");
	await expect(page.locator("body")).toHaveScreenshot();
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
