/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { RootContext } from "@stratakit/foundations/secret-internals";

/**
 * Internal hook that should be called by all bricks.
 * Currently, it just validates that bricks are used inside `Root` (from foundations).
 *
 * @private
 */
export function useInit() {
	if (!React.useContext(RootContext)) {
		DEV: console.error(
			`All @stratakit/bricks components must be used within a <Root> component from @stratakit/foundations.`,
		);
	}
}
