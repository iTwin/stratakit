/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import cx from "classnames";
import * as Ariakit from "@ariakit/react";

interface ButtonProps extends Ariakit.ButtonProps {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(props, forwardedRef) => {
		return (
			<Ariakit.Button
				accessibleWhenDisabled
				{...props}
				className={cx("🥝-button", props.className)}
				ref={forwardedRef}
			/>
		);
	},
);
