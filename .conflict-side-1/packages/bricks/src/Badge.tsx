/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Role } from "@ariakit/react/role";
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
}

/**
 * A badge component, typically used to designate the status of an item.
 *
 * Example:
 * ```tsx
 * <Badge label="Value" />
 * <Badge label="Value" tone="info" variant="outline" />
 * ```
 */
const Badge = forwardRef<"span", BadgeProps>((props, forwardedRef) => {
	const { tone = "neutral", variant = "solid", label, ...rest } = props;

	return (
		<Role.span
			{...rest}
			data-kiwi-tone={tone}
			data-kiwi-variant={variant}
			className={cx("🥝Badge", props.className)}
			ref={forwardedRef}
		>
			{label}
		</Role.span>
	);
});
DEV: Badge.displayName = "Badge";

// ----------------------------------------------------------------------------

export default Badge;
