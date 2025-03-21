/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { test, expect } from "#playwright";
import AxeBuilder from "@axe-core/playwright";
import type { Page } from "@playwright/test";

const controlsToRole: Record<string, Parameters<Page["getByRole"]>[0]> = {
	checkbox: "checkbox",
	switch: "switch",
	radio: "radio",
	input: "textbox",
	textarea: "textbox",
};

test.describe("default", () => {
	test("wrapping input and label", async ({ page, browserName }) => {
		test.fixme(browserName === "firefox", "This test is flaky in Firefox");

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

	test("with explicit id", async ({ page }) => {
		await page.goto("/tests/field?customControlId");
		await expect(page.getByRole("textbox")).toHaveAccessibleName("Example");
	});

	const description = "Supporting text";
	for (const [control, role] of Object.entries(controlsToRole)) {
		test(`${control} with description`, async ({ page }) => {
			await page.goto(
				`/tests/field?control=${control}&descriptions=${description}`,
			);
			await expect(page.getByRole(role)).toHaveAccessibleDescription(
				description,
			);
		});
	}

	test("with multiple descriptions", async ({ page }) => {
		const descriptions = ["First", "Second"];
		await page.goto(`tests/field?descriptions=${descriptions.join(";")}`);
		await expect(page.getByRole("textbox")).toHaveAccessibleDescription(
			descriptions.join(" "),
		);
	});

	test("with custom description ids", async ({ page }) => {
		await page.goto("tests/field?customDescriptionIds");
		await expect(page.getByRole("textbox")).toHaveAccessibleDescription(
			"Supporting text. More supporting text.",
		);
	});

	test("with custom aria-describedby", async ({ page }) => {
		await page.goto("tests/field?customAriaDescribedBy");
		await expect(page.getByRole("textbox")).toHaveAccessibleDescription(
			"Custom description.",
		);
	});

	test("invalid with error message", async ({ page }) => {
		const errorMessage = "Something is wrong";
		await page.goto(`tests/field?errorMessages=${errorMessage}`);
		const control = page.getByRole("textbox");
		await expect(control).toHaveAttribute("aria-invalid", "true");
		await expect(control).toHaveAccessibleDescription(errorMessage);
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

		for (const [control, role] of Object.entries(controlsToRole)) {
			await page.goto(`/tests/field?control=${control}`);

			const element = await page.getByRole(role);
			await expect(element).toBeVisible();

			const accessibilityScan = await axe.analyze();
			expect(accessibilityScan.violations).toEqual([]);
		}
	});
});
