/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { expect, test } from "#playwright";

test("showcase", { tag: "@visual-2" }, async ({ page }) => {
	await page.goto("/standalone?path=mui/IconButton.showcase");
	await expect(page).toHaveScreenshot();
});

test("invalid color renders with secondary colors on hover", async ({
	page,
}) => {
	await page.emulateMedia({ reducedMotion: "reduce" }); // Avoid sampling in the middle of the color transition
	await page.goto(
		"/standalone?path=mui/IconButton.showcase&export=InvalidColors",
	);

	async function getHoverColorAndBackground(name: string) {
		const locator = page.getByRole("button", { name });
		await locator.hover();
		const colors = await locator.evaluate((element) => {
			const style = getComputedStyle(element);
			return {
				color: style.color,
				backgroundColor: style.backgroundColor,
			};
		});
		return colors;
	}

	const secondary = await getHoverColorAndBackground("secondary");
	for (const color of ["default", "info", "success", "inherit"]) {
		const invalidColor = await getHoverColorAndBackground(color);
		expect(invalidColor.color, `color="${color}" color`).toEqual(
			secondary.color,
		);
		expect(
			invalidColor.backgroundColor,
			`color="${color}" background-color`,
		).toEqual(secondary.backgroundColor);
	}
});
