/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import cx from "classnames";
import * as Ariakit from "@ariakit/react";
import type { FocusableProps, Props } from "./~utils.js";

type ButtonProps = Props<"button", FocusableProps<Ariakit.ButtonProps>> &
	(
		| {
				/** @default "solid" */
				variant?: "solid";
				/**
				 * The tone of the button. Most buttons should be neutral.
				 * Accent buttons can be used to draw attention to the primary action.
				 *
				 * **Note:** The `"accent"` tone is only supported for the `"solid"` variant.
				 *
				 * @default "neutral"
				 */
				tone?: "neutral" | "accent";
		  }
		| {
				variant: "outline" | "ghost";
				tone?: never;
		  }
	);

export const Button = React.forwardRef<
	React.ElementRef<typeof Ariakit.Button>,
	ButtonProps
>((props, forwardedRef) => {
	const { variant = "solid", tone = "neutral", ...rest } = props;
	return (
		<Ariakit.Button
			accessibleWhenDisabled
			data-kiwi-variant={variant}
			data-kiwi-tone={tone}
			{...rest}
			className={cx("🥝-button", props.className)}
			ref={forwardedRef}
		/>
	);
});
DEV: Button.displayName = "Button";
