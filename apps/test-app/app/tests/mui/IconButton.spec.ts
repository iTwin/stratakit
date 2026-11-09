/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { expect, test } from "#playwright";

test.use({ baseURL: "http://localhost:1800/standalone" });

test("showcase", { tag: "@visual-2" }, async ({ mount }) => {
	const component = await mount("mui/IconButton.showcase");
	await expect(component).toHaveScreenshot();
});
