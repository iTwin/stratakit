/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Button as SkButton } from "@stratakit/bricks";
import * as React from "react";
import { useCompatProps } from "./~utils.tsx";

import type { Button as IuiButton } from "@itwin/itwinui-react";
import type { PolymorphicForwardRefComponent } from "./~utils.tsx";
import { Icon } from "@stratakit/foundations";

// ----------------------------------------------------------------------------

type IuiButtonProps = React.ComponentProps<typeof IuiButton>;
type SkButtonProps = React.ComponentProps<typeof SkButton>;

interface ButtonProps
	extends Pick<
		IuiButtonProps,
		| "size"
		| "styleType"
		| "startIcon"
		| "endIcon"
		| "labelProps"
		| "startIconProps"
		| "endIconProps"
		| "stretched"
		| "loading"
		| "htmlDisabled"
	> {
	/** NOT IMPLEMENTED. */
	size?: IuiButtonProps["size"];
	/** NOT IMPLEMENTED. */
	labelProps?: IuiButtonProps["labelProps"];
	/** NOT IMPLEMENTED. */
	stretched?: IuiButtonProps["stretched"];
	/** NOT IMPLEMENTED. */
	loading?: IuiButtonProps["loading"];
}

// ----------------------------------------------------------------------------

/** @see https://itwinui.bentley.com/docs/button */
export const Button = React.forwardRef((props, forwardedRef) => {
	const {
		children,
		styleType = "default",
		startIcon,
		endIcon,
		startIconProps,
		endIconProps,
		htmlDisabled,
		size, // NOT IMPLEMENTED
		labelProps, // NOT IMPLEMENTED
		stretched, // NOT IMPLEMENTED
		loading, // NOT IMPLEMENTED
		...rest
	} = useCompatProps(props);

	const variantAndTone = React.useMemo(() => {
		switch (styleType) {
			case "borderless":
				return { variant: "ghost" satisfies SkButtonProps["variant"] } as const;
			case "high-visibility":
			case "cta":
				return {
					variant: "solid" satisfies SkButtonProps["variant"],
					tone: "accent" satisfies SkButtonProps["tone"],
				} as const;
		}
		return { variant: "solid" satisfies SkButtonProps["variant"] } as const;
	}, [styleType]);

	// When `htmlDisabled` is set, we don't want to use `aria-disabled`.
	const accessibleWhenDisabled = !htmlDisabled;

	return (
		<SkButton
			{...rest}
			accessibleWhenDisabled={accessibleWhenDisabled}
			disabled={props.disabled || htmlDisabled}
			ref={forwardedRef}
			{...variantAndTone}
		>
			{startIcon ? (
				<Icon
					render={startIcon}
					{...(startIconProps as React.ComponentProps<"svg">)}
				/>
			) : null}
			{children}
			{endIcon ? (
				<Icon
					render={endIcon}
					{...(endIconProps as React.ComponentProps<"svg">)}
				/>
			) : null}
		</SkButton>
	);
}) as PolymorphicForwardRefComponent<"button", ButtonProps>;
DEV: Button.displayName = "Button";
