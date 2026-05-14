/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import { forwardRef } from "@stratakit/foundations/secret-internals";
import {
	MuiAutocompleteContext,
	MuiAutocompleteTextFieldInput,
} from "./MuiAutocomplete.js";

// ----------------------------------------------------------------------------

const MuiTextFieldInput = forwardRef<
	"div",
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
