/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import {
	ProgressBar as SkProgressBar,
	VisuallyHidden,
} from "@stratakit/bricks";
import * as React from "react";
import { useCompatProps } from "./~utils.tsx";

import type { ProgressLinear as IuiProgressBar } from "@itwin/itwinui-react";
import type { PolymorphicForwardRefComponent } from "./~utils.tsx";

type IuiProgressBarProps = React.ComponentProps<typeof IuiProgressBar>;

interface ProgressBarProps
	extends Pick<
		IuiProgressBarProps,
		| "value"
		| "indeterminate"
		| "labels"
		| "isAnimated"
		| "status"
		| "labelGroupProps"
	> {
	/** NOT IMPLEMENTED. */
	labels?: IuiProgressBarProps["labels"];
	/** NOT IMPLEMENTED. */
	isAnimated?: IuiProgressBarProps["isAnimated"];
	/** NOT IMPLEMENTED. */
	status?: IuiProgressBarProps["status"];
	/** NOT IMPLEMENTED. */
	labelGroupProps?: IuiProgressBarProps["labelGroupProps"];
}

/** @see https://itwinui.bentley.com/docs/progressindicator */
export const ProgressLinear = React.forwardRef((props, forwardedRef) => {
	const {
		value,
		indeterminate,
		labels, // NOT IMPLEMENTED
		isAnimated, // NOT IMPLEMENTED
		status, // NOT IMPLEMENTED
		labelGroupProps, // NOT IMPLEMENTED
		...rest
	} = useCompatProps(props);

	const labelledBy = React.useId();

	return (
		<>
			<SkProgressBar
				{...rest}
				value={indeterminate === true ? undefined : value}
				ref={forwardedRef}
				aria-labelledby={labelledBy}
			>
				<VisuallyHidden id={labelledBy}>
					{value !== 100 ? "Loading…" : undefined}
				</VisuallyHidden>
			</SkProgressBar>
		</>
	);
}) as PolymorphicForwardRefComponent<"div", ProgressBarProps>;
DEV: ProgressLinear.displayName = "ProgressLinear";
