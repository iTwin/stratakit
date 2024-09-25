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
}

export const Tooltip = React.forwardRef<
	React.ElementRef<typeof Ariakit.Tooltip>,
	TooltipProps
>((props, forwardedRef) => {
	const { content, children, className, ...rest } = props;

	const tooltipId = React.useId();

	return (
		<>
			<Ariakit.TooltipProvider>
				<Ariakit.TooltipAnchor render={children} aria-describedby={tooltipId} />
				<Ariakit.Tooltip
					{...rest}
					className={cx("🥝-tooltip", className)}
					ref={forwardedRef}
					id={tooltipId}
				>
					<div id={tooltipId}>{content}</div>
				</Ariakit.Tooltip>
			</Ariakit.TooltipProvider>
		</>
	);
});
