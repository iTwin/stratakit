/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from "classnames";
import * as Ariakit from "@ariakit/react";
import { forwardRef, type BaseProps } from "./~utils.js";

interface ChipProps extends BaseProps<"div"> {
	/**
	 * The variant style of the Chip.
	 * Use "solid" for primary states and "outline" for less prominent states.
	 *
	 * @default "solid"
	 */
	variant?: "solid" | "outline";
}

/**
 * Chip is a UI component used to represent an item, attribute, or action in a compact visual style.
 * It supports two visual variants: `solid` for primary emphasis and `outline` for less prominent states.
 *
 * Example : Render a Chip with the default "solid" variant
 * ```tsx
 * <Chip>Default Chip</Chip>
 * <Chip variant="outline">Outline Chip</Chip>
 * ```
 */
export const Chip = forwardRef<"div", ChipProps>((props, forwardedRef) => {
	const { variant = "solid", children, ...rest } = props;

	return (
		<Ariakit.Role.div
			data-kiwi-variant={variant}
			{...rest}
			className={cx("🥝-chip", props.className)}
			ref={forwardedRef}
		>
			{children}
		</Ariakit.Role.div>
	);
});
DEV: Chip.displayName = "Chip";
