/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { test } from "#playwright";
import { generateVisualTests } from "~/generateVisualTests.ts";

test.describe("@visual", () => {
	for (const args of generateVisualTests("/tests/mui/Button/Visual")) {
		test(...args);
	}
});
