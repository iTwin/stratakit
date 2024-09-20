/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import cx from "classnames";
import * as Ariakit from "@ariakit/react";

interface TooltipProps extends Omit<Ariakit.TooltipProps, "store"> {
	content: string;
	children: React.ReactNode;
}

export const Tooltip = React.forwardRef<
	React.ElementRef<typeof Ariakit.Tooltip>,
	TooltipProps
>((props, forwardedRef) => {
	const { content, children, className, ...rest } = props;

	return (
		<>
			<Ariakit.TooltipProvider>
				<Ariakit.TooltipAnchor className={cx("", className)}>
					{children}
				</Ariakit.TooltipAnchor>

				<Ariakit.Tooltip
					className={cx("custom-tooltip", className)}
					{...props}
					ref={forwardedRef}
				>
					{content}
				</Ariakit.Tooltip>
			</Ariakit.TooltipProvider>
		</>
	);
});
