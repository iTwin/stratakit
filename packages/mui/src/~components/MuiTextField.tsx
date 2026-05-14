/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import {
	MuiAutocompleteContext,
	MuiAutocompleteTextFieldInput,
} from "./MuiAutocomplete.js";

// ----------------------------------------------------------------------------

const MuiTextFieldInput = React.forwardRef<
	HTMLDivElement,
	React.ComponentProps<typeof OutlinedInput>
>((props, forwardedRef) => {
	const isAutocomplete = React.useContext(MuiAutocompleteContext);
	const Component = isAutocomplete
		? MuiAutocompleteTextFieldInput
		: OutlinedInput;
	return <Component {...props} ref={forwardedRef} />;
});
DEV: MuiTextFieldInput.displayName = "MuiTextFieldInput";

// ----------------------------------------------------------------------------

export { MuiTextFieldInput };
