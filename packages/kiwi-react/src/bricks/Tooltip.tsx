/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import cx from "classnames";
import * as Ariakit from "@ariakit/react";
import { forwardRef, supportsPopover, type FocusableProps } from "./~utils.js";

interface TooltipProps
	extends Omit<FocusableProps<"div">, "content">,
		Pick<Ariakit.TooltipProps, "open" | "unmountOnHide">,
		Pick<Ariakit.TooltipProviderProps, "defaultOpen" | "setOpen"> {
	/**
	 * The content to be displayed inside the tooltip when the trigger element is hovered or focused.
	 */
	content: React.ReactNode;

	/**
	 * The element that will trigger the tooltip when hovered or focused.
	 * Common examples include buttons, links, or form controls.
	 *
	 * **Note**: The trigger must be a single interactive element. Do not add a
	 * tooltip to a non-interactive static element (such as a `<div>` or `<svg>`). Also,
	 * the trigger element must forward its ref and spread its props.
	 */
	children: React.ReactElement;

	/**
	 * Determines how ARIA attributes are applied to the tooltip for accessibility:
	 *
	 * - `"description"`: The tooltip provides additional information via `aria-describedby`.
	 * - `"label"`: The tooltip acts as a label for the trigger element via `aria-labelledby`.
	 * - `"none"`: No ARIA attributes are applied; the tooltip is only for visual assistance.
	 *
	 * @default "description"
	 */
	type?: "description" | "label" | "none";
}

/**
 * A tooltip component that provides additional information or context for an interactive trigger element.
 *
 * Example usage:
 *
 * ```tsx
 * <Tooltip content="This is a tooltip">
 *   <button>Hover over me</button>
 * </Tooltip>
 * ```
 *
 * **Note**: The trigger element must be a single interactive element, such as a button or link. Do not add a
 * tooltip to a non-interactive static element (such as a `<div>` or `<svg>`).
 *
 * **Note**: If `type` is set to `"none"`, the tooltip will not use ARIA attributes.
 */
export const Tooltip = forwardRef<"div", TooltipProps>(
	(props, forwardedRef) => {
		const generatedId = React.useId();
		const {
			content,
			children,
			className,
			type = "description",
			id = generatedId,
			defaultOpen: defaultOpenProp,
			open: openProp,
			setOpen: setOpenProp,
			unmountOnHide = type === "none",
			...rest
		} = props;

		const store = Ariakit.useTooltipStore();
		const open = Ariakit.useStoreState(store, (state) => state.open);
		const popover = Ariakit.useStoreState(
			store,
			(state) => state.popoverElement,
		);

		React.useEffect(
			function syncPopoverWithOpenState() {
				if (popover?.isConnected) {
					popover?.togglePopover?.(open);
				}
			},
			[open, popover],
		);

		return (
			<>
				<Ariakit.TooltipProvider
					store={store}
					defaultOpen={defaultOpenProp}
					open={openProp}
					setOpen={setOpenProp}
				>
					<Ariakit.TooltipAnchor
						render={children}
						{...(type === "description" && { "aria-describedby": id })}
						{...(type === "label" && { "aria-labelledby": id })}
					/>
					<Ariakit.Tooltip
						aria-hidden="true"
						{...rest}
						unmountOnHide={unmountOnHide}
						className={cx("🥝-tooltip", className)}
						ref={forwardedRef}
						id={id}
						style={{
							zIndex: supportsPopover ? undefined : 9999,
							...props.style,
						}}
						wrapperProps={{ popover: "manual" }}
						portal={!supportsPopover}
					>
						{content}
					</Ariakit.Tooltip>
				</Ariakit.TooltipProvider>
			</>
		);
	},
);
DEV: Tooltip.displayName = "Tooltip";
