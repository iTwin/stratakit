/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import cx from "classnames";
import * as Ariakit from "@ariakit/react";

interface TooltipProps extends Omit<Ariakit.TooltipProps, "store" | "content"> {
	content: React.ReactNode;
	children: React.ReactElement;
	ariaStrategy?: "description" | "label" | "none";
}

export const Tooltip = React.forwardRef<
	React.ElementRef<typeof Ariakit.Tooltip>,
	TooltipProps
>((props, forwardedRef) => {
	const {
		content,
		children,
		className,
		ariaStrategy = "none",
		id = React.useId(),
		...rest
	} = props;

	return (
		<>
			<Ariakit.TooltipProvider>
				<Ariakit.TooltipAnchor render={children} aria-describedby={id} />
				<Ariakit.Tooltip
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
