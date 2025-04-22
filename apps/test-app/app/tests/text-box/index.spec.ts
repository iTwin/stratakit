/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "#playwright";

for (const type of ["input", "textarea", "composition"] as const) {
	test(`default ${type}`, async ({ page }) => {
		await page.goto(`/tests/text-box?${type}`);

		const input = page.getByRole("textbox");
		const label = page.getByText("Fruit");

		await expect(input).toHaveAccessibleName("Fruit");

		await label.click();
		await expect(input).toBeFocused();

		await page.keyboard.type("apple");
		await expect(input).toHaveValue("apple");
	});

	test(`disabled ${type}`, async ({ page }) => {
		await page.goto(`/tests/text-box?${type}&disabled`);

		const input = page.getByRole("textbox");
		await expect(input).toHaveAccessibleName("Fruit");
		await expect(input).toBeDisabled();

		await page.keyboard.press("Tab");
		await expect(input).toBeFocused();

		// should not be able to type in a disabled input
		await page.keyboard.type("apple");
		await expect(input).toHaveValue("");
	});
}

test.describe("@visual", () => {
	test("default", async ({ page }) => {
		await page.goto("/tests/text-box?visual");
		await expect(page.locator("body")).toHaveScreenshot();
	});

	for (const type of ["input", "composition"] as const) {
		test(`focus outline ${type}`, async ({ page }) => {
			await page.goto(`/tests/text-box?${type}`);
			const input = page.getByRole("textbox");
			await input.focus();
			await expect(page.locator("body")).toHaveScreenshot();
		});
	}

	test("forced-colors", async ({ page, browserName }) => {
		test.skip(
			browserName === "webkit",
			"Webkit does not support forced-colors",
		);
		await page.goto("/tests/text-box?visual");
		await page.emulateMedia({ forcedColors: "active" });
		await expect(page.locator("body")).toHaveScreenshot();
	});
});

test.describe("@a11y", () => {
	for (const type of ["input", "textarea", "composition"] as const) {
		test(`Axe Page Scan ${type}`, async ({ page }) => {
			await page.goto(`/tests/text-box?${type}`);

			const axe = new AxeBuilder({ page });
			const accessibilityScan = await axe.analyze();
			expect(accessibilityScan.violations).toEqual([]);
		});
	}
});
