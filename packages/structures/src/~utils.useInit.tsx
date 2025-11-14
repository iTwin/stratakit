/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { RootContext } from "@stratakit/foundations/secret-internals";

/**
 * Internal hook that should be called by all structures.
 * Currently, it just validates that structures are used inside `Root` (from foundations).
 *
 * @private
 */
export function useInit() {
	if (!React.useContext(RootContext)) {
		DEV: console.error(
			`All @stratakit/structures components must be used within a <Root> component from @stratakit/foundations.`,
		);
	}
}
