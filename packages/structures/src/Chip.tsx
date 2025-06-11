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
	{ labelId: string; setLabelId: (id: string) => void } | undefined
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

/**
 * Root component of the compositional Chip component.
 *
 * Example:
 * ```tsx
 * <Chip.Root>
 *   <Chip.Label>Label</Chip.Label>
 *   <Chip.DismissButton onClick={onClick} />
 * </Chip.Root>
 * ```
 */
const ChipRoot = forwardRef<"div", ChipRootProps>((props, forwardedRef) => {
	const { variant = "solid", ...rest } = props;

	const [labelId, setLabelId] = React.useState("");

	return (
		<ChipRootContext.Provider
			value={React.useMemo(() => ({ labelId, setLabelId }), [labelId])}
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

/**
 * Label component that should be used with the compositional Chip component.
 */
const ChipLabel = forwardRef<"span", ChipLabelProps>((props, forwardedRef) => {
	const { setLabelId } = useSafeContext(ChipRootContext);

	const newId = React.useId();
	const id = props.id ?? newId;
	React.useEffect(() => {
		setLabelId(id);
	}, [setLabelId, id]);

	return <Role.span {...props} id={id} ref={forwardedRef} />;
});
DEV: ChipLabel.displayName = "Chip.Label";

// ----------------------------------------------------------------------------

interface ChipDismissButtonProps extends Omit<BaseProps<"button">, "children"> {
	/**
	 * Label for the dismiss button.
	 */
	label?: string;
}

/**
 * Dismiss button component that should be used with the compositional Chip component.
 */
const ChipDismissButton = forwardRef<"button", ChipDismissButtonProps>(
	(props, forwardedRef) => {
		const { labelId } = useSafeContext(ChipRootContext);

		const newId = React.useId();
		const id = props.id ?? newId;
		return (
			<IconButton
				id={id}
				aria-labelledby={`${id} ${labelId}`}
				label="Dismiss"
				{...props}
				className={cx("🥝-chip-dismiss-button", props.className)}
				variant="ghost"
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
