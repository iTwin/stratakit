/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

/** biome-ignore-all lint/correctness/noUnusedVariables: <not all variables are implemented> */

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
	/**
	 * PARTIALLY IMPLEMENTED.
	 *
	 * - If `labels` is passed, it now replaces the visually hidden "Loading…" text as a string of `labels` joined with spaces.
	 * Thus, the previously *visual* `labels` are now *visually hidden*.
	 * - Else, the visually hidden "Loading…" text is continued to be used when `value!==100`.
	 */
	labels?: IuiProgressBarProps["labels"];
	/** NO-OP: Always animated. */
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
		labels,
		isAnimated, // NO-OP
		status, // NOT IMPLEMENTED
		labelGroupProps, // NOT IMPLEMENTED
		...rest
	} = useCompatProps(props);

	const labelledBy = React.useId();

	const fallbackLoadingText = value !== 100 ? "Loading…" : undefined;

	return (
		<SkProgressBar
			{...rest}
			value={indeterminate === true ? undefined : value}
			ref={forwardedRef}
			aria-labelledby={labelledBy}
		>
			<VisuallyHidden id={labelledBy}>
				{labels?.join(" ") ?? fallbackLoadingText}
			</VisuallyHidden>
		</SkProgressBar>
	);
}) as PolymorphicForwardRefComponent<"div", ProgressBarProps>;
DEV: ProgressLinear.displayName = "ProgressLinear";
