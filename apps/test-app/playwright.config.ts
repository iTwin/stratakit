/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

// biome-ignore lint/style/noRestrictedImports: This is the only place we import `test` from `@playwright/test`.
import { test as base, defineConfig, devices } from "@playwright/test";

import type { Page } from "@playwright/test";

/** See https://playwright.dev/docs/test-configuration. */
export default defineConfig({
	/* Run tests in files in parallel */
	fullyParallel: true,
	/* Fail the build on CI if you accidentally left test.only in the source code. */
	forbidOnly: !!process.env.CI,
	/* Retry on CI only */
	retries: process.env.CI ? 2 : 0,
	/* Fail fast in CI */
	maxFailures: process.env.CI ? 3 : undefined,
	/* Opt out of parallel tests on CI. */
	workers: process.env.CI ? 1 : undefined,
	/* Reporter to use. See https://playwright.dev/docs/test-reporters */
	reporter: [["html", { open: "never" }]],
	/* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
	use: {
		/* Base URL to use in actions like `await page.goto('/')`. */
		baseURL: "http://localhost:1800",

		/* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
		trace: "on-first-retry",

		/* https://playwright.dev/docs/emulation#color-scheme-and-media */
		colorScheme: "dark",

		/* Set localStorage.🥝:show-navigation to false to hide the sidebar during tests. See https://playwright.dev/docs/api/class-testoptions#test-options-storage-state */
		storageState: {
			cookies: [],
			origins: [
				{
					origin: "http://localhost:1800",
					localStorage: [
						{
							name: "🥝:show-navigation",
							value: "false",
						},
					],
				},
			],
		},
	},
	/* Keep snapshots in the same folder as the test file to nest the files. */
	snapshotPathTemplate:
		"{snapshotDir}/{testFileDir}/{testFileName}-snapshot.{arg}{-projectName}{-snapshotSuffix}{ext}",

	/* Configure projects for major browsers */
	projects: [
		{
			name: "chromium",
			use: { ...devices["Desktop Chrome"] },
		},

		{
			name: "firefox",
			use: { ...devices["Desktop Firefox"] },
		},
	],
	webServer: {
		command: "pnpm preview",
		url: "http://localhost:1800",
		reuseExistingServer: true,
	},

	expect: {
		toHaveScreenshot: {
			threshold: 0.05,
		},
	},
});

export const test = base.extend<{ page: Page }>({
	page: async ({ page }, use) => {
		const _goto = page.goto;
		page.goto = async (url, options) => {
			const result = await _goto.call(page, url, options);
			await page.waitForSelector("body[data-loaded]", { timeout: 5000 });
			return result;
		};
		await use(page);
	},
});

// biome-ignore lint/style/noRestrictedImports: This is the only place we import `expect` from `@playwright/test`.
export { expect } from "@playwright/test";
