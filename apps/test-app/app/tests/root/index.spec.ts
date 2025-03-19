/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { test, expect } from "#playwright";
import AxeBuilder from "@axe-core/playwright";

test("default", async ({ page }) => {
	await page.goto("/tests/root", { waitUntil: "domcontentloaded" });
	await expect(page.locator("h1")).toHaveText("Root");
	await expect(page.locator("body")).toHaveScreenshot("shadow.png");

	const popoutPromise = page.waitForEvent("popup");
	await page.getByRole("button", { name: "Open popout" }).click();
	const popout = await popoutPromise;
	await Promise.all([
		popout.waitForLoadState("domcontentloaded"),
		// Wait for the fonts to load, since we’re using the font
		popout.waitForFunction(() =>
			Array.from(document.fonts).some(
				(font) => font.family === "InterVariable" && font.status === "loaded",
			),
		),
	]);
	await expect(popout.locator("body")).toHaveScreenshot("popout.png");
});

test("conditional rendering", async ({ page }) => {
	await page.goto("/tests/root?_conditionalRendering");

	const button = page.getByRole("button", { name: "Toggle Root" });
	await expect(button).toHaveScreenshot("with-root.png");

	await button.click();
	await expect(button).toHaveScreenshot("without-root.png");
});

test("synchronizeColorScheme", async ({ page }) => {
	const document = page.locator("html");
	const meta = page.locator("meta[name='color-scheme']");

	await test.step("false", async () => {
		await page.goto("/tests/root?synchronizeColorScheme=false");
		const defaultScheme = "dark light"; // conditionally set in root.tsx

		await expect(document).toHaveAttribute("data-color-scheme", defaultScheme);
		await expect(meta).toHaveAttribute("content", defaultScheme);

		page.emulateMedia({ colorScheme: "light" });
		await expect(document).toHaveAttribute("data-color-scheme", defaultScheme);
		await expect(meta).toHaveAttribute("content", defaultScheme);
	});

	await test.step("true", async () => {
		page.emulateMedia({ colorScheme: "dark" });
		await page.goto("/tests/root?synchronizeColorScheme=true");

		await expect(document).toHaveAttribute("data-color-scheme", "dark");
		await expect(meta).toHaveAttribute("content", "dark");

		// Switch color scheme
		page.emulateMedia({ colorScheme: "light" });
		await expect(document).toHaveAttribute("data-color-scheme", "light");
		await expect(meta).toHaveAttribute("content", "light");
	});
});

test.describe("@a11y", () => {
	test("Axe Page Scan", async ({ page }) => {
		await page.goto("/tests/root");

		const button = await page.getByRole("button", { name: "Open popout" });
		await expect(button).toBeVisible();

		const axe = new AxeBuilder({ page });
		const accessibilityScan = await axe.analyze();
		expect(accessibilityScan.violations).toEqual([]);
	});
});
