/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { VisuallyHidden as SkVisuallyHidden } from "@stratakit/bricks";
import { useCompatProps } from "./~utils.js";

import type { VisuallyHidden as IuiVisuallyHidden } from "@itwin/itwinui-react";
import type { PolymorphicForwardRefComponent } from "./~utils.js";

type IuiVisuallyHiddenProps = React.ComponentProps<typeof IuiVisuallyHidden>;

interface VisuallyHiddenProps
	extends Pick<IuiVisuallyHiddenProps, "unhideOnFocus"> {
	/** NOT IMPLEMENTED. */
	unhideOnFocus?: IuiVisuallyHiddenProps["unhideOnFocus"];
}

/** @see https://itwinui.bentley.com/docs/visuallyhidden */
export const VisuallyHidden = React.forwardRef((props, forwardedRef) => {
	const {
		children,

		// biome-ignore-start lint/correctness/noUnusedVariables: NOT IMPLEMENTED
		unhideOnFocus,
		// biome-ignore-end lint/correctness/noUnusedVariables: NOT IMPLEMENTED

		...rest
	} = useCompatProps(props);
	return (
		<SkVisuallyHidden {...rest} ref={forwardedRef}>
			{children}
		</SkVisuallyHidden>
	);
}) as PolymorphicForwardRefComponent<"span", VisuallyHiddenProps>;
DEV: VisuallyHidden.displayName = "VisuallyHidden";
