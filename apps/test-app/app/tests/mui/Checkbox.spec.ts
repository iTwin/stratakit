/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { test } from "#playwright";
import { generateVisualTests } from "~/generateVisualTests.ts";

test.describe
	.only("@visual", () => {
		generateVisualTests("/tests/mui/Checkbox/Visual");
	});
