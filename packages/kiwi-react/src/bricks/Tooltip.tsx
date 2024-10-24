/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import cx from "classnames";
import * as Ariakit from "@ariakit/react";

interface TooltipProps extends Omit<Ariakit.TooltipProps, "store" | "content"> {
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
		...rest
	} = props;

	// Determine the correct aria attribute dynamically
	const ariaProps =
		type === "description"
			? { "aria-describedby": id }
			: type === "label"
				? { "aria-labelledby": id }
				: {};

	return (
		<>
			<Ariakit.TooltipProvider>
				<Ariakit.TooltipAnchor render={children} {...ariaProps} />
				<Ariakit.Tooltip
					unmountOnHide={type === "none"}
					{...rest}
					className={cx("🥝-tooltip", className)}
					ref={forwardedRef}
					id={id}
				>
					{content}
				</Ariakit.Tooltip>
			</Ariakit.TooltipProvider>
		</>
	);
});
