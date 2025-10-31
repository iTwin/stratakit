/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { Role } from "@ariakit/react/role";
import { Icon } from "@stratakit/foundations";
import { forwardRef } from "@stratakit/foundations/secret-internals";
import cx from "classnames";

import type { BaseProps } from "@stratakit/foundations/secret-internals";

interface BadgeProps extends Omit<BaseProps<"span">, "children"> {
	/**
	 * The label displayed inside the badge.
	 */
	label: React.ReactNode;

	/**
	 * The tone of the badge.
	 * @default "neutral"
	 */
	tone?: "neutral" | "info" | "positive" | "attention" | "critical" | "accent";

	/**
	 * The variant style of the badge.
	 * @default "solid"
	 */
	variant?: "solid" | "muted" | "outline";

	/**
	 * Icon to be displayed at the start of the badge.
	 *
	 * Can be a URL of an SVG from the `@stratakit/icons` package,
	 * or a custom JSX icon.
	 */
	iconStart?: string | React.JSX.Element;

	/**
	 * Icon to be displayed at the end of the badge.
	 *
	 * Can be a URL of an SVG from the `@stratakit/icons` package,
	 * or a custom JSX icon.
	 */
	iconEnd?: string | React.JSX.Element;
}

/**
 * A badge component, typically used to designate the status of an item.
 *
 * Example:
 * ```tsx
 * <Badge label="Value" />
 * <Badge label="Value" tone="info" variant="outline" iconStart={…} iconEnd={…} />
 * ```
 */
const Badge = forwardRef<"span", BadgeProps>((props, forwardedRef) => {
	const {
		tone = "neutral",
		variant = "solid",
		label,
		iconStart,
		iconEnd,
		...rest
	} = props;

	return React.createElement(
		Role.span,
		{
			...rest,
			"data-_sk-tone": tone,
			"data-_sk-variant": variant,
			className: cx("🥝Badge", props.className),
			ref: forwardedRef,
		},
		iconStart &&
			(typeof iconStart === "string"
				? React.createElement(Icon, { href: iconStart })
				: iconStart),
		label,
		iconEnd &&
			(typeof iconEnd === "string"
				? React.createElement(Icon, { href: iconEnd })
				: iconEnd),
	);
});
DEV: Badge.displayName = "Badge";

// ----------------------------------------------------------------------------

export default Badge;
