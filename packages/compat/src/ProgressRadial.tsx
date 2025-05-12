/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Spinner as SkSpinner } from "@stratakit/bricks";
import * as React from "react";
import { useCompatProps } from "./~utils.tsx";

import type { ProgressRadial as IuiSpinner } from "@itwin/itwinui-react";
import type { PolymorphicForwardRefComponent } from "./~utils.tsx";

type SkSpinnerProps = React.ComponentProps<typeof SkSpinner>;
type IuiSpinnerProps = React.ComponentProps<typeof IuiSpinner>;

interface ProgressRadialProps
	extends Pick<
		IuiSpinnerProps,
		"value" | "indeterminate" | "status" | "size" | "children"
	> {
	/** NOT IMPLEMENTED */
	value?: IuiSpinnerProps["value"];
	/** NO-OP. Always in indeterminate mode. */
	indeterminate?: IuiSpinnerProps["indeterminate"];
	/** NOT IMPLEMENTED */
	status?: IuiSpinnerProps["status"];
	/**
	 * PARTIALLY IMPLEMENTED.
	 *
	 * - If `children` is passed and it is a string, it now replaces the visually hidden "Loading…" text.
	 * Thus, the previously *visual* `children` are now *visually hidden*.
	 * - Else, the visually hidden "Loading…" text is continued to be used when `value!==100`.
	 */
	children?: IuiSpinnerProps["children"];
}

/** @see https://itwinui.bentley.com/docs/progressindicator */
export const ProgressRadial = React.forwardRef((props, forwardedRef) => {
	const {
		value, // NOT IMPLEMENTED
		indeterminate, // NO-OP
		status, // NOT IMPLEMENTED
		children, // PARTIALLY IMPLEMENTED
		size: sizeProp,
		...rest
	} = useCompatProps(props);

	const size: SkSpinnerProps["size"] = React.useMemo(() => {
		switch (sizeProp) {
			case "x-small":
				return "small";
			case "small":
				return "medium";
			case "":
				return "large";
			case "large":
				return "xlarge";
		}

		return undefined;
	}, [sizeProp]);

	const alt = React.useMemo(() => {
		if (children && typeof children === "string") {
			return children;
		}

		return undefined;
	}, [children]);

	return <SkSpinner {...rest} ref={forwardedRef} size={size} alt={alt} />;
}) as PolymorphicForwardRefComponent<"div", ProgressRadialProps>;
DEV: ProgressRadial.displayName = "ProgressRadial";
