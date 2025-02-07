/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from "classnames";
import * as Ariakit from "@ariakit/react";
import { forwardRef, type BaseProps } from "./~utils.js";

interface BadgeProps extends Omit<BaseProps<"div">, "children"> {
	/**
	 * The label displayed inside the badge.
	 */
	label: string;

	/**
	 * The size of the badge.
	 * @default "medium"
	 */
	size?: "small" | "medium";

	/**
	 * The tone of the badge.
	 * @default "neutral"
	 */
	tone?:
		| "neutral"
		| "info"
		| "positive"
		| "attention"
		| "severe"
		| "critical"
		| "special"
		| "highlight";

	/**
	 * The variant style of the badge.
	 * @default "solid"
	 */
	variant?: "solid" | "muted" | "outline";
}

/**
 * Example:
 * ```tsx
 * <Badge label="Value" />
 * <Badge label="Value" tone="info" variant="outline" />
 * ```
 */
export const Badge = forwardRef<"div", BadgeProps>((props, forwardedRef) => {
	const {
		size = "medium",
		tone = "neutral",
		variant = "solid",
		label,
		...rest
	} = props;

	return (
		<Ariakit.Role.div
			{...rest}
			data-kiwi-size={size}
			data-kiwi-tone={tone}
			data-kiwi-variant={variant}
			className={cx("🥝-badge", props.className)}
			ref={forwardedRef}
		>
			{label}
		</Ariakit.Role.div>
	);
});
DEV: Badge.displayName = "Badge";
