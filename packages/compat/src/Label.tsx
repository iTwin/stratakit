/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { Field as SkField } from "@stratakit/bricks";
import { useCompatProps } from "./~utils.js";

import type { Label as IuiLabel } from "@itwin/itwinui-react";
import type { PolymorphicForwardRefComponent } from "./~utils.js";

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
		// biome-ignore-start lint/correctness/noUnusedVariables: NOT IMPLEMENTED
		displayStyle,
		disabled,
		required,
		// biome-ignore-end lint/correctness/noUnusedVariables: NOT IMPLEMENTED

		...rest
	} = useCompatProps(props);

	return <SkField.Label {...rest} ref={forwardedRef} />;
}) as PolymorphicForwardRefComponent<"label", LabelProps>;
DEV: Label.displayName = "Label";
