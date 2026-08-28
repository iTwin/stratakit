/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { expect } from "#playwright";
import { SCREENSHOT_TEST_ID } from "./ScreenShotTestId.ts";

import type { Page, PlaywrightTestArgs, TestDetails } from "@playwright/test";

type TestBody = (args: PlaywrightTestArgs) => Promise<void>;

type TestArgs = [name: string, details: TestDetails, test: TestBody];

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
			await expect(page.getByTestId(SCREENSHOT_TEST_ID)).toHaveScreenshot();
		},
	];
}

/**
 * Creates a set of test arguments that run visual tests against the light,
 * dark, and forced colors theme.  Expects the components to be wrapped in
 * {@link ScreenShotWrapper}.
 *
 * Only generate the arguments and don't call `test` directly here to avoid
 * Playwright reporting this filename as the source for all the visual tests.
 *
 * @param path - the page to test
 *
 * @example
 * test.describe("@visual", () => {
 *   for (const args of generateVisualTests("/tests/mui/Alert/Visual")) {
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
