/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Label as SkLabel } from "@stratakit/bricks";
import * as React from "react";
import { useCompatProps } from "./~utils.tsx";

import type { Label as IuiLabel } from "@itwin/itwinui-react";
import type { PolymorphicForwardRefComponent } from "./~utils.tsx";

type IuiLabelProps = React.ComponentProps<typeof IuiLabel>;

interface LabelProps
	extends Pick<IuiLabelProps, "displayStyle" | "disabled" | "required"> {
	/** NOT IMPLEMENTED. */
	displayStyle?: IuiLabelProps["displayStyle"];
	/** NOT IMPLEMENTED. */
	disabled?: IuiLabelProps["disabled"];
	/** NOT IMPLEMENTED. */
	required?: IuiLabelProps["required"];
}

/** @see https://itwinui.bentley.com/docs/label */
export const Label = React.forwardRef((props, forwardedRef) => {
	const {
		// biome-ignore lint/correctness/noUnusedVariables: <NOT IMPLEMENTED>
		displayStyle, // NOT IMPLEMENTED
		// biome-ignore lint/correctness/noUnusedVariables: <NOT IMPLEMENTED>
		disabled, // NOT IMPLEMENTED
		// biome-ignore lint/correctness/noUnusedVariables: <NOT IMPLEMENTED>
		required, // NOT IMPLEMENTED
		...rest
	} = useCompatProps(props);
	return <SkLabel {...rest} ref={forwardedRef} />;
}) as PolymorphicForwardRefComponent<"label", LabelProps>;
DEV: Label.displayName = "Label";
