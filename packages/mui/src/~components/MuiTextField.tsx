/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { Role } from "@ariakit/react/role";
import OutlinedInput from "@mui/material/OutlinedInput";
import { forwardRef } from "@stratakit/foundations/secret-internals";

import type { BaseProps } from "@stratakit/foundations/secret-internals";

// ----------------------------------------------------------------------------

const MuiTextFieldContext = React.createContext<
	| {
			renderEndAdornment?: (endAdornment: React.ReactNode) => React.ReactNode;
			InputComponent?: React.ComponentType<
				BaseProps & React.RefAttributes<HTMLDivElement>
			>;
	  }
	| undefined
>(undefined);

// ----------------------------------------------------------------------------

const MuiTextFieldInputSlot = forwardRef<
	"div",
	React.ComponentProps<typeof OutlinedInput>
>((props, forwardedRef) => {
	const { renderEndAdornment } = React.useContext(MuiTextFieldContext) ?? {};

	return (
		<OutlinedInput
			{...props}
			endAdornment={
				renderEndAdornment
					? renderEndAdornment(props.endAdornment)
					: props.endAdornment
			}
			ref={forwardedRef}
		/>
	);
});
DEV: MuiTextFieldInputSlot.displayName = "MuiTextFieldInputSlot";

// ----------------------------------------------------------------------------

const MuiTextFieldInput = forwardRef<"div", BaseProps>(
	(props, forwardedRef) => {
		const { InputComponent = Role } =
			React.useContext(MuiTextFieldContext) ?? {};
		return <InputComponent {...props} ref={forwardedRef} />;
	},
);
DEV: MuiTextFieldInput.displayName = "MuiTextFieldInput";

// ----------------------------------------------------------------------------

export { MuiTextFieldContext, MuiTextFieldInput, MuiTextFieldInputSlot };
