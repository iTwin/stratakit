/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { Role } from "@ariakit/react/role";
import { forwardRef } from "@stratakit/foundations/secret-internals";
import {
	MuiAutocompleteContext,
	MuiAutocompleteTextFieldInput,
} from "./MuiAutocomplete.js";

import type { BaseProps } from "@stratakit/foundations/secret-internals";

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

export { MuiTextFieldInput };
