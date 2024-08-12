/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { test, expect } from "@playwright/test";
import assert from "node:assert";

test("default", async ({ page, baseURL }) => {
	assert(baseURL);
	await page.goto(baseURL);

	await expect(page.locator(".🥝-button")).toHaveScreenshot();
});
