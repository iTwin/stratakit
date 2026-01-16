/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
// @ts-check

import * as fs from "node:fs";
import { promisify } from "node:util";

import { AxeBuilder } from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { parseString } from "xml2js";

const sitemap = await fs.promises.readFile("./dist/sitemap-0.xml", "utf8");
const { urlset } = await promisify(parseString)(sitemap);
const routes = urlset.url.map(
	(/** @type any */ url) => new URL(url.loc).pathname,
);

test.describe("Automated a11y scan", () => {
	routes.forEach((/** @type string */ route) => {
		test(`${route} should have no violations`, async ({ page }, testInfo) => {
			await page.goto(route);

			const axe = new AxeBuilder({ page })
				.withTags(["wcag2a", "wcag22aa"])
				.disableRules([
					"scrollable-region-focusable", // This is the browser's responsibility
				]);

			/** @type import("axe-core").AxeResults | undefined */ let accessibilityScanResults;
			await test.step("light mode", async () => {
				await page.emulateMedia({ colorScheme: "light" });
				accessibilityScanResults = await axe.analyze();
			});
			await test.step("dark mode", async () => {
				await page.emulateMedia({ colorScheme: "dark" });
				const darkModeResults = await axe.analyze();
				accessibilityScanResults?.violations.push(
					...darkModeResults.violations,
				);
			});

			await testInfo.attach("a11y-violations", {
				body: JSON.stringify(accessibilityScanResults?.violations, null, 2),
				contentType: "application/json",
			});
			await testInfo.attach("full-a11y-scan", {
				body: JSON.stringify(accessibilityScanResults, null, 2),
				contentType: "application/json",
			});

			expect(accessibilityScanResults?.violations).toEqual([]);
		});
	});
});
