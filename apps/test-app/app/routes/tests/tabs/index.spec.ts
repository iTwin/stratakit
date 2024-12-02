/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { test, expect } from "#playwright";
import AxeBuilder from "@axe-core/playwright";

test("default", async ({ page }) => {
	await page.goto("/tests/tabs");

	const tab1 = page.getByRole("tab", { name: "Tab 1" });
	const tab2 = page.getByRole("tab", { name: "Tab 2" });
	const tab3 = page.getByRole("tab", { name: "Tab 3" });

	const tab1Panel = page.getByRole("tabpanel", { name: "Tab 1" });
	const tab2Panel = page.getByRole("tabpanel", { name: "Tab 2" });
	const tab3Panel = page.getByRole("tabpanel", { name: "Tab 3" });

	await expect(tab1).toHaveAttribute("aria-selected", "true");
	await expect(tab2).toHaveAttribute("aria-selected", "false");
	await expect(tab3).toHaveAttribute("aria-selected", "false");

	await expect(tab1Panel).toBeVisible();
	await expect(tab2Panel).not.toBeVisible();
	await expect(tab3Panel).not.toBeVisible();

	await tab2.click();
	await expect(tab1).toHaveAttribute("aria-selected", "false");
	await expect(tab2).toHaveAttribute("aria-selected", "true");
	await expect(tab3).toHaveAttribute("aria-selected", "false");

	await expect(tab1Panel).not.toBeVisible();
	await expect(tab2Panel).toBeVisible();
	await expect(tab3Panel).not.toBeVisible();

	await page.keyboard.press("ArrowRight");
	await expect(tab1).toHaveAttribute("aria-selected", "false");
	await expect(tab2).toHaveAttribute("aria-selected", "false");
	await expect(tab3).toHaveAttribute("aria-selected", "true");

	await expect(tab1Panel).not.toBeVisible();
	await expect(tab2Panel).not.toBeVisible();
	await expect(tab3Panel).toBeVisible();
});

test("disabled", async ({ page }) => {
	await page.goto("/tests/tabs?disabled=true");

	const tab1 = page.getByRole("tab", { name: "Tab 1" });
	const tab2 = page.getByRole("tab", { name: "Tab 2" });
	const tab3 = page.getByRole("tab", { name: "Tab 3" });

	const tab1Panel = page.getByRole("tabpanel", { name: "Tab 1" });
	const tab2Panel = page.getByRole("tabpanel", { name: "Tab 2" });
	const tab3Panel = page.getByRole("tabpanel", { name: "Tab 3" });

	await expect(tab1).toHaveAttribute("aria-selected", "true");
	await expect(tab1Panel).toBeVisible();

	await expect(tab1).not.toBeDisabled();
	await expect(tab2).toBeDisabled();
	await expect(tab3).not.toBeDisabled();

	// should not select disabled tab
	await tab2.click({ force: true });
	await expect(tab2).toHaveAttribute("aria-selected", "false");
	await expect(tab1Panel).toBeVisible();
	await expect(tab2Panel).not.toBeVisible();

	await tab3.click();
	await expect(tab3).toHaveAttribute("aria-selected", "true");
	await expect(tab3Panel).toBeVisible();

	// should still focus disabled tab
	await page.keyboard.press("ArrowLeft");
	await expect(tab2).toBeFocused();
	await expect(tab2Panel).not.toBeVisible();
	await expect(tab3Panel).toBeVisible();
});

test("defaultSelectedId", async ({ page }) => {
	await page.goto("/tests/tabs?defaultSelectedId=tab2");

	const tab1 = page.getByRole("tab", { name: "Tab 1" });
	const tab2 = page.getByRole("tab", { name: "Tab 2" });
	const tab3 = page.getByRole("tab", { name: "Tab 3" });

	const tab1Panel = page.getByRole("tabpanel", { name: "Tab 1" });
	const tab2Panel = page.getByRole("tabpanel", { name: "Tab 2" });
	const tab3Panel = page.getByRole("tabpanel", { name: "Tab 3" });

	await expect(tab1).toHaveAttribute("aria-selected", "false");
	await expect(tab2).toHaveAttribute("aria-selected", "true");
	await expect(tab3).toHaveAttribute("aria-selected", "false");

	await expect(tab1Panel).not.toBeVisible();
	await expect(tab2Panel).toBeVisible();
	await expect(tab3Panel).not.toBeVisible();

	await tab1.click();
	await expect(tab1).toHaveAttribute("aria-selected", "true");
	await expect(tab2).toHaveAttribute("aria-selected", "false");
	await expect(tab1Panel).toBeVisible();
	await expect(tab2Panel).not.toBeVisible();
});

test("@visual", async ({ page }) => {
	await page.goto("/tests/tabs?visual=true");
	await expect(page.locator("body")).toHaveScreenshot();
});

test.describe("@a11y", () => {
	test("Axe Page Scan", async ({ page }) => {
		await page.goto("/tests/tabs");

		const tab1 = page.getByRole("tab", { name: "Tab 1" });
		await expect(tab1).toBeVisible();

		const axe = new AxeBuilder({ page });
		const accessibilityScan = await axe.analyze();
		expect(accessibilityScan.violations).toEqual([]);
	});
});
