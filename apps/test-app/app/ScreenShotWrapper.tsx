/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from "react";
import { SCREENSHOT_TEST_ID } from "./ScreenShotTestId.ts";

import styles from "./ScreenShotWrapper.module.css";

function SpacedComponent({ children }: React.PropsWithChildren) {
	return <div className={styles.section}>{children}</div>;
}

interface ScreenShotWrapperProps extends React.PropsWithChildren {
	addSpacing?: boolean;
}

/**
 * Shrink wraps children in a div with a know `data-testid`.
 */
export function ScreenShotWrapper({
	children,
	addSpacing,
}: ScreenShotWrapperProps) {
	if (addSpacing) {
		children = React.Children.map(children, (child) => (
			<SpacedComponent>{child}</SpacedComponent>
		));
	}

	return (
		<div data-testid={SCREENSHOT_TEST_ID} className={styles.shrinkWrap}>
			{children}
		</div>
	);
}
