/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { expect } from "#playwright";
import { SCREENSHOT_TEST_ID } from "./ScreenShotTestId.ts";

import type { Page, PlaywrightTestArgs, TestDetails } from "@playwright/test";

type TestBody = (args: PlaywrightTestArgs) => Promise<void>;

type TestArgs = [name: string, details: TestDetails, test: TestBody];

/**
 * Creates a set of test arguments that run visual tests against the light,
 * dark, and forced colors theme.
 *
 * Only generate the arguments and don't call `test` directly here to avoid
 * Playwright reporting this filename as the source for all the visual tests.
 *
 * @param path - the page to test
 * @param selector - a function that returns a locator given the page object.
 *
 * @example
 * test.describe("@visual", () => {
 *   for (const args of generateVisualTests("/tests/mui/Alert/Visual", )) {
 *     test(...args);
 *  }
 * });
 */
export function generateVisualTests(path: string): TestArgs[] {
	return [
		makeArgs("light", path, { colorScheme: "light" }),
		makeArgs("dark", path, { colorScheme: "dark" }),
		makeArgs("forced-colors", path, { forcedColors: "active" }),
	];
}

const screenShotWrapperSelector = `[data-testid="${SCREENSHOT_TEST_ID}"]`;

function makeArgs(
	name: string,
	path: string,
	media: Parameters<Page["emulateMedia"]>[0],
): TestArgs {
	return [
		name,
		{ tag: "@visual" },
		async ({ page }: PlaywrightTestArgs) => {
			await page.emulateMedia(media);
			await page.goto(path);

			const locator = page.locator(
				`body:not(:has(${screenShotWrapperSelector})), ${screenShotWrapperSelector}`,
			);

			await expect(locator).toHaveScreenshot();
		},
	];
}
