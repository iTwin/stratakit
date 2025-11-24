/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { useStoreState } from "@ariakit/react/store";
import * as AkTooltip from "@ariakit/react/tooltip";
import {
	forwardRef,
	useEventHandlers,
	usePopoverApi,
	useUnreactiveCallback,
} from "@stratakit/foundations/secret-internals";
import cx from "classnames";
import { useInit } from "./~utils.useInit.js";
import { TooltipContext } from "./Tooltip.internal.js";

import type { FocusableProps } from "@stratakit/foundations/secret-internals";

interface TooltipProps
	extends Omit<FocusableProps<"div">, "content">,
		Pick<AkTooltip.TooltipProps, "open" | "unmountOnHide">,
		Pick<
			AkTooltip.TooltipProviderProps,
			"defaultOpen" | "setOpen" | "placement"
		> {
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

	/**
	 * The placement of the tooltip.
	 *
	 * When not enough space is available to satisfy the specified placement, the tooltip will
	 * automatically flip to the opposite side.
	 */
	placement?: AkTooltip.TooltipProviderProps["placement"];
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
const Tooltip = forwardRef<"div", TooltipProps>((props, forwardedRef) => {
	useInit();

	const generatedId = React.useId();
	const context = React.useContext(TooltipContext);

	const {
		content,
		children,
		type = "description",
		id = generatedId,
		defaultOpen: defaultOpenProp,
		open: openProp,
		setOpen: setOpenProp,
		unmountOnHide = type === "none",
		placement = context.placement,
		...rest
	} = props;

	const store = AkTooltip.useTooltipStore();
	const open = useStoreState(store, "open");
	const popoverElement = useStoreState(store, "popoverElement");
	const setOpen = useUnreactiveCallback(store.setOpen);

	const popoverProps = usePopoverApi({
		element: popoverElement,
		open,
		setOpen,
	});

	return (
		<AkTooltip.TooltipProvider
			store={store}
			defaultOpen={defaultOpenProp}
			open={openProp}
			setOpen={setOpenProp}
			placement={placement}
		>
			<AkTooltip.TooltipAnchor
				render={children}
				onContextMenu={useEventHandlers(
					(children.props as React.ComponentProps<"div">)?.onContextMenu,
					(event) => {
						// Show tooltip on long press for buttons
						const isButton =
							event.currentTarget.localName === "button" ||
							event.currentTarget.role === "button";
						if (!isButton) return;

						event.preventDefault();
						store.setOpen(true);
					},
				)}
				data-has-popover-open={open || undefined}
				{...(type === "description" && { "aria-describedby": id })}
				{...(type === "label" && { "aria-labelledby": id })}
			/>
			<AkTooltip.Tooltip
				portal
				{...rest}
				unmountOnHide={unmountOnHide}
				className={cx("🥝Tooltip", props.className)}
				ref={forwardedRef}
				id={id}
				style={{ ...popoverProps.style, ...props.style }}
				wrapperProps={{ popover: popoverProps.popover }}
			>
				{content}
			</AkTooltip.Tooltip>
		</AkTooltip.TooltipProvider>
	);
});
DEV: Tooltip.displayName = "Tooltip";

// ----------------------------------------------------------------------------

export default Tooltip;
