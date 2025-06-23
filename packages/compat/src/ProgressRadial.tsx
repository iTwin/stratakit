/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Spinner as SkSpinner } from "@stratakit/bricks";
import * as React from "react";
import { useCompatProps } from "./~utils.js";

import type { ProgressRadial as IuiSpinner } from "@itwin/itwinui-react";
import type { PolymorphicForwardRefComponent } from "./~utils.js";

type SkSpinnerProps = React.ComponentProps<typeof SkSpinner>;
type IuiSpinnerProps = React.ComponentProps<typeof IuiSpinner>;

interface ProgressRadialProps
	extends Pick<
		IuiSpinnerProps,
		"value" | "indeterminate" | "status" | "size" | "children"
	> {
	/** NOT IMPLEMENTED */
	value?: IuiSpinnerProps["value"];
	/** NOT IMPLEMENTED. At the moment, always will be in indeterminate mode regardless of this prop's value. */
	indeterminate?: IuiSpinnerProps["indeterminate"];
	/** NOT IMPLEMENTED */
	status?: IuiSpinnerProps["status"];
	/** NOT IMPLEMENTED */
	children?: IuiSpinnerProps["children"];
}

/** @see https://itwinui.bentley.com/docs/progressindicator */
export const ProgressRadial = React.forwardRef((props, forwardedRef) => {
	const {
		// biome-ignore-start lint/correctness/noUnusedVariables: NOT IMPLEMENTED
		value,
		indeterminate,
		status,
		children,
		// biome-ignore-end lint/correctness/noUnusedVariables: NOT IMPLEMENTED

		size: sizeProp,
		...rest
	} = useCompatProps(props);

	const size = React.useMemo<SkSpinnerProps["size"]>(() => {
		switch (sizeProp) {
			case "x-small":
				return "small";
			case "small":
				return "medium";
			case "large":
				return "xlarge";
		}

		return "large";
	}, [sizeProp]);

	return <SkSpinner {...rest} ref={forwardedRef} size={size} />;
}) as PolymorphicForwardRefComponent<"div", ProgressRadialProps>;
DEV: ProgressRadial.displayName = "ProgressRadial";
