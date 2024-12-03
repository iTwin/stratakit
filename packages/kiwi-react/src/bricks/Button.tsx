/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import cx from "classnames";
import * as Ariakit from "@ariakit/react";

interface ButtonProps extends Ariakit.ButtonProps {
	/** @default "solid" */
	variant?: "solid" | "outline" | "ghost";
}

export const Button = React.forwardRef<
	React.ElementRef<typeof Ariakit.Button>,
	ButtonProps
>((props, forwardedRef) => {
	const { variant = "solid", ...rest } = props;
	return (
		<Ariakit.Button
			accessibleWhenDisabled
			data-kiwi-variant={variant}
			{...rest}
			className={cx("🥝-button", props.className)}
			ref={forwardedRef}
		/>
	);
});
DEV: Button.displayName = "Button";
