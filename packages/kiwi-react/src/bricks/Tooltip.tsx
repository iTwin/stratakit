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
	 * The content to be displayed inside the tooltip.
	 */
	content: React.ReactNode;

	/**
	 * The element that will trigger the tooltip when hovered or focused.
	 * Common examples include buttons, links, or form controls.
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
 * Tooltip component that provides additional information or context for a trigger element.
 *
 * Example usage:
 *
 * ```tsx
 * <Tooltip content="This is a tooltip">
 *   <button>Hover over me</button>
 * </Tooltip>
 * ```
 *
 * **Note**: If `type` is set to `"none"`, the tooltip will not use ARIA attributes and will unmount when hidden.
 */
export const Tooltip = forwardRef<"div", TooltipProps>(
	(props, forwardedRef) => {
		const {
			content,
			children,
			className,
			type = "description",
			id = React.useId(),
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
						wrapperProps={{ popover: "manual" } as React.ComponentProps<"div">}
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
