/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { SCREENSHOT_TEST_ID } from "./ScreenShotTestId.ts";

import type React from "react";

import styles from "./ScreenShotWrapper.module.css";

/**
 * Shrink wraps children in a div with a know `data-testid`.
 */
export function ScreenShotWrapper({ children }: React.PropsWithChildren) {
	return (
		<div data-testid={SCREENSHOT_TEST_ID} className={styles.shrinkWrap}>
			{children}
		</div>
	);
}
