/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { expect, test } from "#playwright";

test("showcase", { tag: "@visual-2" }, async ({ page }) => {
	await page.goto("/standalone?path=mui/IconButton.showcase");
	await expect(page).toHaveScreenshot();
});

test("color=default renders with secondary color", async ({ page }) => {
	await page.goto(
		"/standalone?path=mui/IconButton.showcase&export=InvalidColors",
	);

	const button = page.getByRole("button", { name: "default" });
	await expect(button).toHaveClass(/MuiIconButton-colorSecondary/);
});
