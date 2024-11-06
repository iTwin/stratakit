/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import cx from "classnames";
import * as Ariakit from "@ariakit/react";
import { useControlledState } from "./~hooks.js";

interface TooltipProps
	extends Omit<Ariakit.TooltipProps, "store" | "content">,
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
export const Tooltip = React.forwardRef<
	React.ElementRef<typeof Ariakit.Tooltip>,
	TooltipProps
>((props, forwardedRef) => {
	const {
		content,
		children,
		className,
		type = "description",
		id = React.useId(),
		defaultOpen: defaultOpenProp,
		open: openProp,
		setOpen: setOpenProp,
		...rest
	} = props;

	const [open, setOpen] = useControlledState(
		defaultOpenProp,
		openProp,
		setOpenProp,
	);

	const store = Ariakit.useTooltipStore();
	const wrapper = Ariakit.useStoreState(store, (state) => state.popoverElement);

	// Determine the correct aria attribute dynamically
	const ariaProps =
		type === "description"
			? { "aria-describedby": id }
			: type === "label"
				? { "aria-labelledby": id }
				: {};

	return (
		<>
			<Ariakit.TooltipProvider
				store={store}
				open={open}
				setOpen={React.useCallback(
					(open: boolean) => {
						setOpen(open);
						wrapper?.togglePopover?.(open);
					},
					[setOpen, wrapper],
				)}
			>
				<Ariakit.TooltipAnchor render={children} {...ariaProps} />
				<Ariakit.Tooltip
					unmountOnHide={type === "none"}
					{...rest}
					className={cx("🥝-tooltip", className)}
					ref={forwardedRef}
					id={id}
					style={{ zIndex: supportsPopover ? undefined : 9999, ...props.style }}
					wrapperProps={{ popover: "manual" } as React.ComponentProps<"div">}
					portal={!supportsPopover}
				>
					{content}
				</Ariakit.Tooltip>
			</Ariakit.TooltipProvider>
		</>
	);
});

const isBrowser = typeof document !== "undefined";

const supportsPopover = isBrowser && "popover" in HTMLElement.prototype;
