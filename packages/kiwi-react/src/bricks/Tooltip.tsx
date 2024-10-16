/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import cx from "classnames";
import * as Ariakit from "@ariakit/react";

export type AriaStrategy = "description" | "label" | "none";

interface TooltipProps extends Omit<Ariakit.TooltipProps, "store" | "content"> {
	content: React.ReactNode;
	children: React.ReactElement;
	ariaStrategy?: AriaStrategy;
}

export const Tooltip = React.forwardRef<
	React.ElementRef<typeof Ariakit.Tooltip>,
	TooltipProps
>((props, forwardedRef) => {
	const {
		content,
		children,
		className,
		ariaStrategy = "description",
		id = React.useId(),
		...rest
	} = props;

	// Determine the correct aria attribute dynamically
	const ariaProps =
		ariaStrategy === "description"
			? { "aria-describedby": id }
			: ariaStrategy === "label"
				? { "aria-labelledby": id }
				: {};

	return (
		<>
			<Ariakit.TooltipProvider>
				<Ariakit.TooltipAnchor render={children} {...ariaProps} />
				{ariaStrategy && ariaStrategy !== "none" ? (
					<Ariakit.Tooltip
						{...rest}
						className={cx("🥝-tooltip", className)}
						ref={forwardedRef}
						id={id}
					>
						{content}
					</Ariakit.Tooltip>
				) : null}
			</Ariakit.TooltipProvider>
		</>
	);
});
