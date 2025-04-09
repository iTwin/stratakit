/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Role } from "@ariakit/react/role";
import cx from "classnames";
import * as React from "react";
import { Dismiss } from "./Icon.js";
import { IconButton } from "./IconButton.js";
import { forwardRef } from "./~utils.js";

import type { BaseProps } from "./~utils.js";

interface ChipProps extends Omit<BaseProps<"div">, "children"> {
	/**
	 * The label displayed inside the chip.
	 */
	label: string;

	/**
	 * The variant style of the Chip.
	 * Use "solid" for primary states and "outline" for less prominent states.
	 *
	 * @default "solid"
	 */
	variant?: "solid" | "outline";

	/**
	 * Callback invoked when the dismiss ("❌") button is clicked.
	 */
	onDismiss?: () => void;
}

/**
 * Chip is a UI component used to represent an item, attribute, or action in a compact visual style.
 * It supports two visual variants: `solid` for primary emphasis and `outline` for less prominent states.
 *
 * Example:
 * ```tsx
 * <Chip label="Value" />
 * <Chip label="Value" variant="outline" />
 * ```
 */
export const Chip = forwardRef<"div", ChipProps>((props, forwardedRef) => {
	const { variant = "solid", onDismiss, label, ...rest } = props;

	const baseId = React.useId();
	const labelId = `${baseId}-label`;
	const dismissIconId = `${baseId}-dismiss`;

	return (
		<Role.div
			data-kiwi-variant={variant}
			{...rest}
			className={cx("🥝-chip", props.className)}
			ref={forwardedRef}
		>
			<span id={labelId}>{label}</span>
			{onDismiss && (
				<IconButton
					id={dismissIconId}
					className="🥝-chip-dismiss-button"
					variant="ghost"
					aria-labelledby={`${dismissIconId} ${labelId}`}
					label="Dismiss"
					labelVariant="visually-hidden"
					icon={<Dismiss />}
					onClick={onDismiss}
				/>
			)}
		</Role.div>
	);
});
DEV: Chip.displayName = "Chip";
