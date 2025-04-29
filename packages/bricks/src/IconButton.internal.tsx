/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Role } from "@ariakit/react/role";
import cx from "classnames";
import * as React from "react";
import { useGhostAlignment } from "./~utils.GhostAligner.js";
import { forwardRef } from "./~utils.js";

import type { Button } from "./Button.js";
import type { BaseProps } from "./~utils.js";

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

	const ghostAlignment = useGhostAlignment();

	return (
		<Role.span
			{...rest}
			className={cx(
				"🥝-icon-button",
				"🥝-button",
				{ "🥝-ghost-aligner": variant === "ghost" },
				props.className,
			)}
			data-kiwi-variant={variant}
			data-kiwi-ghost-align={variant === "ghost" ? ghostAlignment : undefined}
			ref={forwardedRef}
		/>
	);
});
DEV: IconButtonPresentation.displayName = "IconButtonPresentation";
