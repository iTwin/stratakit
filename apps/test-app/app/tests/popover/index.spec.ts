/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "#playwright";

test("default", async ({ page }) => {
	await page.goto("/tests/popover");

	const button = page.getByRole("button", { name: "Toggle" });
	const popover = page.getByRole("dialog");

	await expect(button).not.toHaveAttribute("data-has-popover-open");
	await expect(popover).toBeHidden();

	await button.click();
	await expect(button).toHaveAttribute("data-has-popover-open");
	await expect(popover).toBeVisible();
});

test("controlled", async ({ page }) => {
	await page.goto("/tests/popover?_controlled");

	const button = page.getByRole("button", { name: "Click me" });
	const openButton = page.getByRole("button", { name: "Controlled open" });
	const popover = page.getByRole("dialog");

	let messageText = "";
	page.on("console", (msg) => {
		messageText = msg.text();
	});

	await button.click();
	await expect(popover).toBeVisible();
	expect(messageText).toEqual("setOpen(true)");

	await button.click();
	await expect(popover).toBeHidden();
	expect(messageText).toEqual("setOpen(false)");

	await openButton.click();
	await expect(popover).toBeVisible();
});

test("hide on interact outside", async ({ page }) => {
	await page.goto("/tests/popover");

	const button = page.getByRole("button", { name: "Toggle" });
	const popover = page.getByRole("dialog");

	await test.step("outside click", async () => {
		await button.click();
		await expect(popover).toBeVisible();

		await page.click("body");
		await expect(popover).toBeHidden();
	});

	await test.step("tab outside", async () => {
		await button.click();
		await expect(popover).toBeVisible();
		await expect(popover).toBeFocused();

		await page.keyboard.press("Tab");
		await expect(popover).toBeHidden();
	});
});

test("hide on escape", async ({ page }) => {
	await page.goto("/tests/popover");

	const button = page.getByRole("button", { name: "Toggle" });
	const popover = page.getByRole("dialog");

	await button.click();
	await expect(popover).toBeVisible();

	await page.keyboard.press("Escape");
	await expect(popover).toBeHidden();
});

test.describe("@visual", () => {
	test("default", async ({ page }) => {
		await page.goto("/tests/popover?visual");

		const button = page.getByRole("button", { name: "Manage scenes" });
		await button.click();

		await expect(page).toHaveScreenshot();
	});

	test("forced-colors", async ({ page, browserName }) => {
		test.skip(
			browserName === "webkit",
			"Webkit does not support forced-colors",
		);
		await page.goto("/tests/popover?visual");
		await page.emulateMedia({ forcedColors: "active" });

		const button = page.getByRole("button", { name: "Manage scenes" });
		await button.click();

		await expect(page).toHaveScreenshot();
	});
});

test.describe("@a11y", () => {
	test("Axe Page Scan", async ({ page }) => {
		await page.goto("/tests/popover?visual");

		const button = page.getByRole("button", { name: "Manage scenes" });
		const popover = page.getByRole("dialog");

		await button.click();
		await expect(popover).toBeVisible();

		const axe = new AxeBuilder({ page });
		const accessibilityScan = await axe.analyze();
		expect(accessibilityScan.violations).toEqual([]);
	});

	test("focus management", async ({ page }) => {
		await page.goto("/tests/popover?padded");

		const button = page.getByRole("button", { name: "Manage access" });
		const copyLink = page.getByRole("button", { name: "Copy link" });
		const addUsers = page.getByPlaceholder("Add users");

		await button.click();
		await expect(copyLink).toBeFocused();

		await page.keyboard.press("Tab");
		await expect(addUsers).toBeFocused();

		// Restore focus to the disclosure on close
		await page.keyboard.press("Escape");
		await expect(button).toBeFocused();
	});

	test("accessible name", async ({ page }) => {
		await page.goto("/tests/popover?padded");

		const button = page.getByRole("button", { name: "Manage access" });
		const popover = page.getByRole("dialog");

		await button.click();
		await expect(popover).toHaveAccessibleName("Manage access");
	});
});
