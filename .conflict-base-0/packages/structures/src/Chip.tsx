/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { Role } from "@ariakit/react/role";
import { IconButton } from "@stratakit/bricks";
import {
	forwardRef,
	useSafeContext,
} from "@stratakit/foundations/secret-internals";
import cx from "classnames";
import { createStore, useStore } from "zustand";
import { combine } from "zustand/middleware";
import { Dismiss } from "./~utils.icons.js";

import type { BaseProps } from "@stratakit/foundations/secret-internals";
import type { ExtractState } from "zustand";

// ----------------------------------------------------------------------------

type ChipState = ExtractState<ReturnType<typeof createChipStore>>;

function createChipStore(initialState: { labelId: string }) {
	return createStore(
		combine(initialState, (set, _, store) => ({
			setLabelId: (labelId?: string) => {
				set({ labelId: labelId || store.getInitialState().labelId });
			},
		})),
	);
}

const ChipContext = React.createContext<
	ReturnType<typeof createChipStore> | undefined
>(undefined);

function ChipProvider(props: React.PropsWithChildren) {
	const defaultLabelId = React.useId();
	const [store] = React.useState(() =>
		createChipStore({ labelId: defaultLabelId }),
	);

	return (
		<ChipContext.Provider value={store}>{props.children}</ChipContext.Provider>
	);
}

function useChipState<P>(selectorFn: (state: ChipState) => P): P {
	const store = useSafeContext(ChipContext);
	return useStore(store, selectorFn);
}

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

	return (
		<ChipProvider>
			<Role.div
				data-kiwi-variant={variant}
				{...rest}
				className={cx("🥝Chip", props.className)}
				ref={forwardedRef}
			/>
		</ChipProvider>
	);
});
DEV: ChipRoot.displayName = "Chip.Root";

// ----------------------------------------------------------------------------

interface ChipLabelProps extends BaseProps<"span"> {}

/**
 * Label component that should be used with the compositional Chip component.
 */
const ChipLabel = forwardRef<"span", ChipLabelProps>((props, forwardedRef) => {
	const labelId = useChipState((state) => state.labelId);
	const setLabelId = useChipState((state) => state.setLabelId);

	React.useEffect(() => {
		setLabelId(props.id);
	}, [setLabelId, props.id]);

	return (
		<Role.span
			id={labelId}
			{...props}
			className={cx("🥝ChipLabel", props.className)}
			ref={forwardedRef}
		/>
	);
});
DEV: ChipLabel.displayName = "Chip.Label";

// ----------------------------------------------------------------------------

interface ChipDismissButtonProps extends Omit<BaseProps<"button">, "children"> {
	/**
	 * Label for the dismiss button.
	 *
	 * The final accessible name of the dismiss button is a combination of this `label` and the text content of `Chip.Label`.
	 *
	 * @default "Dismiss"
	 */
	label?: string;
}

/**
 * Dismiss button component that should be used with the compositional Chip component.
 */
const ChipDismissButton = forwardRef<"button", ChipDismissButtonProps>(
	(props, forwardedRef) => {
		const { label = "Dismiss", ...rest } = props;
		const labelId = useChipState((state) => state.labelId);

		const defaultId = React.useId();
		const id = props.id ?? defaultId;
		return (
			<IconButton
				id={id}
				aria-labelledby={`${id} ${labelId}`}
				{...rest}
				label={label}
				className={cx("🥝ChipDismissButton", props.className)}
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
