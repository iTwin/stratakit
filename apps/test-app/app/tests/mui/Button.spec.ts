/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { expect, test } from "#playwright";

test("loading indicator", { tag: "@visual" }, async ({ page }) => {
	await page.emulateMedia({ reducedMotion: "reduce" });
	await page.goto("/showcase?path=mui/Button.showcase&export=Loading");
	const button = page.getByRole("button");
	await expect(button).toBeDisabled();
	await expect(button).toHaveScreenshot();
});
