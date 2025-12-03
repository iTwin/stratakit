/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import {
	RootContext,
	useSafeContext,
} from "@stratakit/foundations/secret-internals";
import css from "./styles.css.js";

const packageName = "@stratakit/bricks";
const key = `${packageName}@${__VERSION__}`;

/**
 * Internal hook that should be called by all bricks.
 * Currently, it just validates that bricks are used inside `Root` (from foundations)
 * and stores the package version in Context.
 *
 * @private
 */
export function useInit() {
	const rootContext = useSafeContext(RootContext);
	if (!rootContext.versions?.has(packageName))
		rootContext.versions?.set(packageName, __VERSION__);

	const { rootNode, loadStyles } = rootContext;

	React.useInsertionEffect(() => {
		if (!rootNode || !loadStyles) return;
		const { cleanup } = loadStyles(rootNode, { css, key });
		return cleanup;
	}, [rootNode, loadStyles]);
}
