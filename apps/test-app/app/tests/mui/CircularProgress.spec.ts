/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { expect, test } from "#playwright";

test("renders secondary color for unsupported colors", {
	tag: "@visual",
}, async ({ page }) => {
	await page.emulateMedia({ reducedMotion: "reduce" });
	await page.goto(
		"/showcase?path=mui/CircularProgress.showcase&export=UnsupportedColors",
	);
	await expect(page.getByTestId("unsupported-colors")).toHaveScreenshot();
});
