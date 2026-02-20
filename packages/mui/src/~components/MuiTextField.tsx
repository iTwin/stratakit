/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import { MuiAutocompleteTextFieldInput } from "./MuiAutocomplete.js";

// ----------------------------------------------------------------------------

const MuiTextFieldInput = React.forwardRef<
	HTMLDivElement,
	React.ComponentProps<typeof OutlinedInput>
>((props, forwardedRef) => {
	// TODO: replace with Context after https://github.com/mui/material-ui/issues/47755
	const isAutocomplete = props.className?.includes("MuiAutocomplete-inputRoot");
	const Component = isAutocomplete
		? MuiAutocompleteTextFieldInput
		: OutlinedInput;
	return <Component {...props} ref={forwardedRef} />;
});

// ----------------------------------------------------------------------------

export { MuiTextFieldInput };
