/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { Role } from "@ariakit/react/role";
import OutlinedInput from "@mui/material/OutlinedInput";
import { forwardRef } from "@stratakit/foundations/secret-internals";
import {
	MuiAutocompleteContext,
	MuiAutocompleteTextFieldInput,
} from "./MuiAutocomplete.js";

import type { BaseProps } from "@stratakit/foundations/secret-internals";

// ----------------------------------------------------------------------------

const MuiTextFieldContext = React.createContext<
	| {
			renderEndAdornment?: (endAdornment: React.ReactNode) => React.ReactNode;
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
		const isAutocomplete = React.useContext(MuiAutocompleteContext);
		const Component = isAutocomplete ? MuiAutocompleteTextFieldInput : Role;
		return <Component {...props} ref={forwardedRef} />;
	},
);
DEV: MuiTextFieldInput.displayName = "MuiTextFieldInput";

// ----------------------------------------------------------------------------

export { MuiTextFieldContext, MuiTextFieldInput, MuiTextFieldInputSlot };
