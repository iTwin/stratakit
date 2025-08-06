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
	const visuallyHiddenDismiss = dialog.getByRole("button", {
		name: "Dismiss popup",
	});

	await expect(dialog).toBeHidden();

	await button.click();
	await expect(dialog).toBeVisible();
	await expect(dialog).toHaveAccessibleName("Heading");
	await expect(visuallyHiddenDismiss).toBeVisible();

	await page.click("body");
	await expect(dialog).toBeHidden();

	await button.click();
	await expect(dialog).toBeVisible();

	await page.keyboard.press("Escape");
	await expect(dialog).toBeHidden();

	await button.click();
	await expect(dialog).toBeVisible();

	await visuallyHiddenDismiss.dispatchEvent("click");
	await expect(dialog).toBeHidden();
});

test.describe("@visual", () => {
	test("default", async ({ page }) => {
		await page.goto("/tests/dialog?visual");

		const button = page.getByRole("button", { name: "Open" });
		await button.click();

		await expect(page).toHaveScreenshot();
	});

	test("forced-colors", async ({ page, browserName }) => {
		test.skip(
			browserName === "webkit",
			"Webkit does not support forced-colors",
		);
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
});
