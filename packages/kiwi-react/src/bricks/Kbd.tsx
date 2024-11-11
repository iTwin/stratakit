/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import cx from "classnames";

interface KbdProps extends React.HTMLAttributes<HTMLElement> {}

export const Kbd = React.forwardRef<HTMLElement, KbdProps>(
	(props, forwardedRef) => {
		const { className, ...rest } = props;

		return (
			<kbd {...rest} className={cx("🥝-kbd", className)} ref={forwardedRef} />
		);
	},
);
