/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { TextBox } from "@stratakit/bricks";

import { useCompatProps } from "./~utils.tsx";

import type { Input as IuiInput } from "@itwin/itwinui-react";
import type { PolymorphicForwardRefComponent } from "./~utils.tsx";

type IuiInputProps = React.ComponentProps<typeof IuiInput>;
type SkTextBoxInputProps = React.ComponentProps<typeof TextBox.Input>;

interface InputProps
	extends Pick<IuiInputProps, "status" | "size" | "htmlSize"> {
	/** NOT IMPLEMENTED. */
	children?: IuiInputProps["children"];

	/** NOT IMPLEMENTED. */
	size?: IuiInputProps["size"];

	/** NOT IMPLEMENTED. */
	status?: IuiInputProps["status"];
}

/** @see https://itwinui.bentley.com/docs/input */
export const Input = React.forwardRef((props, forwardedRef) => {
	const {
		children, // NOT IMPLEMENTED
		htmlSize,
		size, // NOT IMPLEMENTED
		status, // NOT IMPLEMENTED
		type: inputType,
		...rest
	} = useCompatProps(props);

	return (
		<TextBox.Input
			{...rest}
			type={inputType as SkTextBoxInputProps["type"]}
			size={htmlSize}
			ref={forwardedRef}
		/>
	);
}) as PolymorphicForwardRefComponent<"input", InputProps>;
DEV: Input.displayName = "Input";
