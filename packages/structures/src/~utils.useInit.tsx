/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { RootContext } from "@stratakit/foundations/secret-internals";

const packageName = "@stratakit/structures";

/**
 * Internal hook that should be called by all structures.
 * Currently, it just validates that structures are used inside `Root` (from foundations)
 * and stores the package version in Context.
 *
 * @private
 */
export function useInit() {
	const rootContext = React.useContext(RootContext);
	if (!rootContext) {
		DEV: console.error(
			`All ${packageName} components must be used within a <Root> component from @stratakit/foundations.`,
		);
	} else {
		rootContext.versions?.set(packageName, __VERSION__);
	}
}
