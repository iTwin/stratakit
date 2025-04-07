/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import cx from "classnames";
import { forwardRef, type BaseProps } from "./~utils.js";
import { Role } from "@ariakit/react/role";
import type { Button } from "./Button.js";

// ----------------------------------------------------------------------------

export const IconButtonContext = React.createContext<{
	iconSize: "regular" | "large";
}>({ iconSize: "regular" });

// ----------------------------------------------------------------------------

interface IconButtonPresentationProps
	extends BaseProps<"span">,
		Pick<React.ComponentProps<typeof Button>, "variant"> {}

export const IconButtonPresentation = forwardRef<
	"span",
	IconButtonPresentationProps
>((props, forwardedRef) => {
	const { variant, ...rest } = props;
	return (
		<Role.span
			{...rest}
			className={cx("🥝-icon-button", "🥝-button", props.className)}
			data-kiwi-variant={variant}
			ref={forwardedRef}
		/>
	);
});
DEV: IconButtonPresentation.displayName = "IconButtonPresentation";
