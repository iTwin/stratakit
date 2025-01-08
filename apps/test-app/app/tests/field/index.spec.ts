/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { test, expect } from "#playwright";
import AxeBuilder from "@axe-core/playwright";

test.describe("default", () => {
	test("wrapping input and label", async ({ page }) => {
		await page.goto("/tests/field?control=input");
		await expect(page.getByRole("textbox")).toHaveAccessibleName(
			"input example",
		);
	});

	test("wrapping textarea and label", async ({ page }) => {
		await page.goto("/tests/field?control=textarea");
		await expect(page.getByRole("textbox")).toHaveAccessibleName(
			"textarea example",
		);
	});

	test("wrapping radio and label", async ({ page }) => {
		await page.goto("/tests/field?control=radio");
		await expect(page.getByRole("radio")).toHaveAccessibleName("radio example");
	});

	test("wrapping checkbox and label", async ({ page }) => {
		await page.goto("/tests/field?control=checkbox");
		await expect(page.getByRole("checkbox")).toHaveAccessibleName(
			"checkbox example",
		);
	});

	test("wrapping switch and label", async ({ page }) => {
		await page.goto("/tests/field?control=switch");
		await expect(page.getByRole("switch")).toHaveAccessibleName(
			"switch example",
		);
	});

	test("rendering as a label", async ({ page }) => {
		await page.goto("/tests/field?control=checkbox&asLabel");
		await expect(page.locator(".🥝-label.🥝-field")).toBeVisible();
	});

	test("with description", async ({ page }) => {
		const description = "Supporting text";
		await page.goto(`/tests/field?description=${description}`);
		await expect(page.getByRole("textbox")).toHaveAccessibleDescription(
			description,
		);
	});
});

test.describe("@visual", () => {
	test("text controls", async ({ page }) => {
		await page.goto("/tests/field?visual&controlType=text");
		await expect(page.locator("body")).toHaveScreenshot();
	});

	test("checkable controls", async ({ page }) => {
		await page.goto("/tests/field?visual&controlType=checkable");
		await expect(page.locator("body")).toHaveScreenshot();
	});
});

test.describe("@a11y", () => {
	test("Axe Page Scan", async ({ page }) => {
		const axe = new AxeBuilder({ page });
		const components = ["input", "textarea", "radio", "checkbox", "switch"];

		for (const component of components) {
			await page.goto(`/tests/field?control=${component}`);

			if (component === "input" || component === "textarea") {
				const textbox = await page.getByRole("textbox");
				await expect(textbox).toBeVisible();
			}

			if (component === "radio") {
				const radio = await page.getByRole("radio");
				await expect(radio).toBeVisible();
			}

			if (component === "checkbox") {
				const checkbox = await page.getByRole("checkbox");
				await expect(checkbox).toBeVisible();
			}

			if (component === "switch") {
				const theSwitch = await page.getByRole("switch");
				await expect(theSwitch).toBeVisible();
			}

			const accessibilityScan = await axe.analyze();
			expect(accessibilityScan.violations).toEqual([]);
		}
	});
});
