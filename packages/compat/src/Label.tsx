/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { Label as SkLabel } from "@stratakit/bricks";

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
		displayStyle, // NOT IMPLEMENTED
		disabled, // NOT IMPLEMENTED
		required, // NOT IMPLEMENTED
		...rest
	} = useCompatProps(props);
	return <SkLabel {...rest} ref={forwardedRef} />;
}) as PolymorphicForwardRefComponent<"label", LabelProps>;
DEV: Label.displayName = "Label";
