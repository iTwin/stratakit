/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { test, expect } from "@playwright/test";

test.describe("default", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/tests/tooltip");

		const button = page.getByRole("button");
		const tooltip = page.getByRole("tooltip");

		await expect(button).toBeVisible();
		await expect(tooltip).toBeHidden();
	});

	test("Mouse in / Hover should display the tooltip", async ({
		page,
		browserName,
	}) => {
		test.skip(
			browserName === "webkit",
			"Tooltip does not appear on hover in Webkit inside Docker :(",
		);

		const button = page.getByRole("button");
		const tooltip = page.getByRole("tooltip");

		await button.hover();
		await expect(tooltip).toBeVisible();
	});

	test("Keyboard focus should display the tooltip", async ({ page }) => {
		const button = page.getByRole("button");
		const tooltip = page.getByRole("tooltip");

		await page.keyboard.press("Tab");
		await expect(button).toBeFocused();
		await expect(tooltip).toBeVisible();
	});
});

test.describe("hover", () => {
	test.skip(
		({ browserName }) => browserName === "webkit",
		"Tooltip does not appear on hover in Webkit inside Docker :(",
	);

	test.beforeEach(async ({ page }) => {
		await page.goto("/tests/tooltip");

		const button = page.getByRole("button");
		const tooltip = page.getByRole("tooltip");

		await button.hover();
		await expect(tooltip).toBeVisible();
	});

	test("Mouse Out / Unhover should hide the tooltip", async ({ page }) => {
		await page.mouse.move(0, 0);

		const tooltip = page.getByRole("tooltip");

		await expect(tooltip).toBeHidden();
	});

	test("Tooltip should stay displayed during hover (should not hide)", async ({
		page,
	}) => {
		const tooltip = page.getByRole("tooltip");

		await page.waitForTimeout(2000);
		await expect(tooltip).toBeVisible();

		await tooltip.hover();
		await page.waitForTimeout(2000);
		await expect(tooltip).toBeVisible();
	});
});

test.describe("dismissal", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/tests/tooltip");

		const button = page.getByRole("button");
		const tooltip = page.getByRole("tooltip");

		await expect(button).toBeVisible();
		await button.focus();
		await expect(tooltip).toBeVisible();
	});

	test("Pressing Escape should hide the tooltip", async ({ page }) => {
		const tooltip = page.getByRole("tooltip");

		await page.keyboard.press("Escape");
		await expect(tooltip).toBeHidden();
	});

	test("Keyboard loss of focus should hide the tooltip", async ({ page }) => {
		const tooltip = page.getByRole("tooltip");

		await page.keyboard.press("Tab");
		await expect(tooltip).toBeHidden();
	});

	test("Outside click should hide the tooltip", async ({ page }) => {
		const tooltip = page.getByRole("tooltip");

		await page.locator("body").click();
		await expect(tooltip).toBeHidden();
	});
});

test.describe("@a11y", () => {
	test("Trigger element should be described by the tooltip", async ({
		page,
	}) => {
		await page.goto("/tests/tooltip");
		const button = page.getByRole("button");
		await expect(button).toHaveAccessibleDescription("This is the tooltip");
	});

	test("Tooltip with 'description' type uses aria-describedby", async ({
		page,
	}) => {
		await page.goto("/tests/tooltip?type=description");

		const button = page.getByRole("button");

		await expect(button).toHaveAccessibleDescription("This is the tooltip");
	});

	test("Tooltip with 'label' type uses aria-labelledby", async ({ page }) => {
		await page.goto("/tests/tooltip?type=label");

		const button = page.getByRole("button");

		await expect(button).toHaveAccessibleName("This is the tooltip");
	});

	test("Tooltip with 'none' type renders no ARIA attributes", async ({
		page,
	}) => {
		await page.goto("/tests/tooltip?type=none");

		const button = page.getByRole("button");

		// Verify no ARIA attributes are applied
		await expect(button).not.toHaveAttribute("aria-describedby");
		await expect(button).not.toHaveAttribute("aria-labelledby");

		// Ensure no tooltip is rendered
		const tooltips = await page.locator('[role="tooltip"]').count();
		expect(tooltips).toBe(0);
	});
});
