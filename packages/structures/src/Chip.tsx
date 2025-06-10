/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Role } from "@ariakit/react/role";
import { IconButton } from "@stratakit/bricks";
import type { BaseProps } from "@stratakit/foundations/secret-internals";
import {
	forwardRef,
	useSafeContext,
} from "@stratakit/foundations/secret-internals";
import cx from "classnames";
import * as React from "react";
import { Dismiss } from "./~utils.icons.js";

// ----------------------------------------------------------------------------

const ChipRootContext = React.createContext<
	{ labelId: string; dismissIconId: string } | undefined
>(undefined);

// ----------------------------------------------------------------------------

interface ChipRootProps extends BaseProps<"div"> {
	/**
	 * The variant style of the Chip.
	 * Use "solid" for primary states and "outline" for less prominent states.
	 *
	 * @default "solid"
	 */
	variant?: "solid" | "outline";
}

const ChipRoot = forwardRef<"div", ChipRootProps>((props, forwardedRef) => {
	const { variant = "solid", ...rest } = props;

	const baseId = React.useId();
	const labelId = `${baseId}-label`;
	const dismissIconId = `${baseId}-dismiss`;

	return (
		<ChipRootContext.Provider
			value={React.useMemo(
				() => ({ labelId, dismissIconId }),
				[labelId, dismissIconId],
			)}
		>
			<Role.div
				data-kiwi-variant={variant}
				{...rest}
				className={cx("🥝-chip", props.className)}
				ref={forwardedRef}
			/>
		</ChipRootContext.Provider>
	);
});
DEV: ChipRoot.displayName = "Chip.Root";

// ----------------------------------------------------------------------------

interface ChipLabelProps extends BaseProps<"span"> {}

const ChipLabel = forwardRef<"span", ChipLabelProps>((props, forwardedRef) => {
	const { labelId } = useSafeContext(ChipRootContext);
	return <Role.span id={labelId} {...props} ref={forwardedRef} />;
});
DEV: ChipLabel.displayName = "Chip.Label";

// ----------------------------------------------------------------------------

interface ChipDismissButtonProps
	extends Omit<BaseProps<"button">, "children"> {}

const ChipDismissButton = forwardRef<"button", ChipDismissButtonProps>(
	(props, forwardedRef) => {
		const { dismissIconId, labelId } = useSafeContext(ChipRootContext);
		return (
			<IconButton
				id={dismissIconId}
				aria-labelledby={`${dismissIconId} ${labelId}`}
				{...props}
				className={cx("🥝-chip-dismiss-button", props.className)}
				variant="ghost"
				label="Dismiss"
				labelVariant="visually-hidden"
				icon={<Dismiss />}
				ref={forwardedRef}
			/>
		);
	},
);
DEV: ChipDismissButton.displayName = "Chip.DismissButton";

// ----------------------------------------------------------------------------

interface ChipProps
	extends Omit<BaseProps<"div">, "children">,
		Pick<ChipRootProps, "variant"> {
	/**
	 * The label displayed inside the chip.
	 */
	label: React.ReactNode;

	/**
	 * Callback invoked when the dismiss ("❌") button is clicked.
	 *
	 * If `undefined`, the dismiss button will not be rendered.
	 *
	 * @default undefined
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
const Chip = forwardRef<"div", ChipProps>((props, forwardedRef) => {
	const { onDismiss, label, ...rest } = props;

	return (
		<ChipRoot {...rest} ref={forwardedRef}>
			<ChipLabel>{label}</ChipLabel>
			{onDismiss && <ChipDismissButton onClick={onDismiss} />}
		</ChipRoot>
	);
});
DEV: Chip.displayName = "Chip";

// ----------------------------------------------------------------------------

export default Chip;
export {
	ChipRoot as Root,
	ChipLabel as Label,
	ChipDismissButton as DismissButton,
};
