/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { test, expect } from "@playwright/test";

function toUrl(urlStr: string, type: "input" | "composition") {
	const [url, urlParams] = urlStr.split("?");
	const params = new URLSearchParams(urlParams);
	if (type === "composition") params.set("composition", "true");

	const paramsStr = params.toString();
	return `${url}?${paramsStr}`;
}

for (const type of ["input", "composition"] as const) {
	test(`default ${type}`, async ({ page }) => {
		await page.goto(toUrl("/tests/text-input", type));

		const input = page.getByRole("textbox");
		const label = page.getByText("Fruit");

		await expect(input).toHaveAccessibleName("Fruit");

		await label.click();
		await expect(input).toBeFocused();

		await page.keyboard.type("apple");
		await expect(input).toHaveValue("apple");
	});

	test(`disabled ${type}`, async ({ page }) => {
		await page.goto(toUrl("/tests/text-input?disabled", type));

		const input = page.locator("input");
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
		await page.goto("/tests/text-input?visual");
		await expect(page.locator("body")).toHaveScreenshot();
	});

	for (const type of ["input", "composition"] as const) {
		test(`focus outline ${type}`, async ({ page }) => {
			await page.goto(toUrl("/tests/text-input", type));
			const input = page.getByRole("textbox");
			await input.focus();
			await expect(page.locator("body")).toHaveScreenshot();
		});

		test(`disabled ${type}`, async ({ page }) => {
			await page.goto(
				toUrl("/tests/text-input?disabled&defaultValue=Value", type),
			);
			await expect(page.locator("body")).toHaveScreenshot();
		});
	}
});
