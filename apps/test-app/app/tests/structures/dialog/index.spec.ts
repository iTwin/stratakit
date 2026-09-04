/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "#playwright";

test("default", async ({ page }) => {
	await page.goto("/tests/dialog");

	const button = page.getByRole("button", { name: "Open" });
	const dialog = page.getByRole("dialog");

	await expect(dialog).toBeHidden();

	await button.click();
	await expect(dialog).toBeVisible();
	await expect(dialog).toHaveAccessibleName("Title");
});

test("hide on interact outside", async ({ page }) => {
	await page.goto("/tests/dialog");

	const button = page.getByRole("button", { name: "Open" });
	const dialog = page.getByRole("dialog");

	await button.click();
	await expect(dialog).toBeVisible();

	await page.click("body");
	await expect(dialog).toBeHidden();
});

test("hide on escape", async ({ page }) => {
	await page.goto("/tests/dialog");

	const button = page.getByRole("button", { name: "Open" });
	const dialog = page.getByRole("dialog");

	await button.click();
	await expect(dialog).toBeVisible();

	await page.keyboard.press("Escape");
	await expect(dialog).toBeHidden();
});

test("close button", async ({ page }) => {
	await page.goto("/tests/dialog");

	const button = page.getByRole("button", { name: "Open" });
	const dialog = page.getByRole("dialog");
	const close = page.getByRole("button", { name: "Dismiss", exact: true });

	await button.click();
	await expect(dialog).toBeVisible();

	await close.click();
	await expect(dialog).toBeHidden();
});

test("action button", async ({ page }) => {
	await page.goto("/tests/dialog");

	const button = page.getByRole("button", { name: "Open" });
	const dialog = page.getByRole("dialog");
	const ok = page.getByRole("button", { name: "Ok" });

	await button.click();
	await expect(dialog).toBeVisible();

	await ok.click();
	await expect(dialog).toBeHidden();
});

test.describe("@visual", () => {
	test("default", async ({ page }) => {
		await page.goto("/tests/dialog?visual");

		const button = page.getByRole("button", { name: "Open" });
		await button.click();

		await expect(page).toHaveScreenshot();
	});

	test("without footer", async ({ page }) => {
		await page.goto("/tests/dialog?closeButton");

		const button = page.getByRole("button", { name: "Open" });
		await button.click();

		await expect(page).toHaveScreenshot();
	});

	test("forced-colors", async ({ page }) => {
		await page.goto("/tests/dialog?visual");
		await page.emulateMedia({ forcedColors: "active" });

		const button = page.getByRole("button", { name: "Open" });
		await button.click();

		await expect(page).toHaveScreenshot();
	});
});

test.describe("@a11y", () => {
	test("Axe Page Scan", async ({ page }) => {
		await page.goto("/tests/dialog?visual");

		const button = page.getByRole("button", { name: "Open" });
		const dialog = page.getByRole("dialog");

		await button.click();
		await expect(dialog).toBeVisible();

		const axe = new AxeBuilder({ page });
		const accessibilityScan = await axe.analyze();
		expect(accessibilityScan.violations).toEqual([]);
	});

	test("focus management", async ({ page }) => {
		await page.goto("/tests/dialog");

		const button = page.getByRole("button", { name: "Open" });
		const dialog = page.getByRole("dialog");
		const close = page.getByRole("button", { name: "Dismiss", exact: true });

		// Focus the dialog on show
		await button.click();
		await expect(dialog).toBeFocused();

		await page.keyboard.press("Tab");
		await expect(close).toBeFocused();

		// Restore focus to the disclosure on hide
		await close.click();
		await expect(button).toBeFocused();
	});

	test("inert outside dialog", async ({ page }) => {
		await page.goto("/tests/dialog");

		const button = page.getByRole("button", { name: "Open" });
		const dialog = page.getByRole("dialog");

		await button.click();
		await expect(dialog).toBeVisible();

		await expect(async () => {
			await button.click({
				timeout: 300,
			});
		}).rejects.toThrow();
	});
});
