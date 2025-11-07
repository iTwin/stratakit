/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Role } from "@ariakit/react/role";
import { Text } from "@stratakit/bricks";
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
	icon?: string | React.JSX.Element;
}

/**
 * A badge component, typically used to designate the status of an item.
 *
 * Example:
 * ```tsx
 * <Badge label="Value" />
 * <Badge label="Value" tone="info" variant="outline" icon={…} />
 * ```
 */
const Badge = forwardRef<"span", BadgeProps>((props, forwardedRef) => {
	const { tone = "neutral", variant = "solid", label, icon, ...rest } = props;
	return (
		<Role.span
			{...rest}
			data-_sk-tone={tone}
			data-_sk-variant={variant}
			className={cx("🥝Badge", props.className)}
			ref={forwardedRef}
		>
			{typeof icon === "string" ? <Icon href={icon} /> : icon}
			<Text variant="body-sm" className="🥝BadgeLabel" render={<span />}>
				{label}
			</Text>
		</Role.span>
	);
});
DEV: Badge.displayName = "Badge";

// ----------------------------------------------------------------------------

export default Badge;
