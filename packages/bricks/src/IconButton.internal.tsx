/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { Role } from "@ariakit/react/role";
import { forwardRef } from "@stratakit/foundations/secret-internals";
import cx from "classnames";

import { useGhostAlignment } from "./~utils.GhostAligner.js";

import type { BaseProps } from "@stratakit/foundations/secret-internals";
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
