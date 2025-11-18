/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "#playwright";

test("default", async ({ page }) => {
	await page.goto("/tests/navigation-list");

	const list = page.getByRole("list");

	await expect(list).toMatchAriaSnapshot(`
	  - list:
	    - listitem:
	      - link "Home"
	    - listitem:
	      - link "Profile"
	    - listitem:
	      - link "Settings"
	`);

	const home = page.getByRole("link", { name: "Home" });
	await home.click();
	await expect(home).toHaveAttribute("aria-current");
});

test.describe("subgroup", async () => {
	test("defaultOpen", async ({ page }) => {
		await page.goto("/tests/navigation-list?subgroup&defaultOpen");

		const list = page.getByRole("list").first();
		await expect(list).toMatchAriaSnapshot(`
	  - list:
	    - listitem:
	      - link "Dashboard"
	    - listitem:
	      - button "Management" [expanded=true]
	      - list:
          - listitem:
            - link "Users"
          - listitem:
            - link "Teams"
	    - listitem:
	      - link "Reports"
	  `);
	});

	test("expansion", async ({ page }) => {
		await page.goto("/tests/navigation-list?subgroup");

		const managementButton = page.getByRole("button", { name: "Management" });
		await expect(managementButton).toHaveAttribute("aria-expanded", "false");

		const subgroup = page.getByRole("list").getByRole("list");
		await expect(subgroup).toBeHidden();

		// Expand
		await managementButton.click();
		await expect(managementButton).toHaveAttribute("aria-expanded", "true");
		await expect(subgroup).toBeVisible();

		// Collapse
		await managementButton.click();
		await expect(managementButton).toHaveAttribute("aria-expanded", "false");
		await expect(subgroup).toBeHidden();
	});
});

test.describe("@visual", () => {
	test("default", async ({ page }) => {
		await page.goto("/tests/navigation-list?visual");
		await expect(page.locator("body")).toHaveScreenshot();
	});

	test("forced-colors", async ({ page, browserName }) => {
		test.skip(
			browserName === "webkit",
			"Webkit does not support forced-colors",
		);
		await page.goto("/tests/navigation-list?visual");
		await page.emulateMedia({ forcedColors: "active" });
		await expect(page.locator("body")).toHaveScreenshot();
	});
});

test.describe("@a11y", () => {
	const paramsSet = new Set([
		new URLSearchParams(),
		new URLSearchParams("?subgroup&defaultOpen"),
	]);

	for (const params of paramsSet) {
		test(`Axe Page Scan: ?${params}`, async ({ page }) => {
			await page.goto(`/tests/navigation-list?${params}`);

			const axe = new AxeBuilder({ page });
			const accessibilityScan = await axe.analyze();
			expect(accessibilityScan.violations).toEqual([]);
		});
	}
});
