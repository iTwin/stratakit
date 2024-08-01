/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import cx from "classnames";

export const Button = React.forwardRef(function Button(
	props: React.ComponentPropsWithoutRef<"button">,
	forwardedRef: React.Ref<HTMLButtonElement>,
) {
	return (
		<button
			{...props}
			className={cx("🥝-button", props.className)}
			ref={forwardedRef}
		>
			{props.children}
		</button>
	);
});
