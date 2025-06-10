/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Tooltip as SkTooltip } from "@stratakit/bricks";
import * as React from "react";
import { useCompatProps } from "./~utils.tsx";

import type { Tooltip as IuiTooltip } from "@itwin/itwinui-react";
import type { PolymorphicForwardRefComponent } from "./~utils.tsx";

type SkTooltipProps = React.ComponentProps<typeof SkTooltip>;
type IuiTooltipProps = React.ComponentProps<typeof IuiTooltip>;

interface TooltipProps
	extends Pick<
		IuiTooltipProps,
		| "content"
		| "children"
		| "placement"
		| "visible"
		| "onVisibleChange"
		| "autoUpdateOptions"
		| "middleware"
		| "reference"
		| "ariaStrategy"
	> {
	/** The element that will trigger the tooltip when hovered or focused. */
	children: SkTooltipProps["children"];
	/** NOT IMPLEMENTED. */
	autoUpdateOptions?: IuiTooltipProps["autoUpdateOptions"];
	/** NOT IMPLEMENTED. */
	middleware?: IuiTooltipProps["middleware"];
	/** NOT IMPLEMENTED. */
	reference?: IuiTooltipProps["reference"];
}

/** @see https://itwinui.bentley.com/docs/tooltip */
export const Tooltip = React.forwardRef((props, forwardedRef) => {
	const {
		content,
		children,
		visible,
		onVisibleChange,
		ariaStrategy = "description",
		placement,
		// biome-ignore lint/correctness/noUnusedVariables: <NOT IMPLEMENTED>
		autoUpdateOptions, // NOT IMPLEMENTED
		// biome-ignore lint/correctness/noUnusedVariables: <NOT IMPLEMENTED>
		middleware, // NOT IMPLEMENTED
		// biome-ignore lint/correctness/noUnusedVariables: <NOT IMPLEMENTED>
		reference, // NOT IMPLEMENTED
		...rest
	} = useCompatProps(props);

	return (
		<SkTooltip
			{...rest}
			placement={placement}
			content={content}
			open={visible}
			setOpen={onVisibleChange}
			type={ariaStrategy}
			ref={forwardedRef}
		>
			{children}
		</SkTooltip>
	);
}) as PolymorphicForwardRefComponent<"div", TooltipProps>;
DEV: Tooltip.displayName = "Tooltip";
