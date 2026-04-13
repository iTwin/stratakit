/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import { forwardRef } from "@stratakit/foundations/secret-internals";
import { MuiAutocompleteContext } from "./MuiAutocomplete.js";

import type { InputLabelProps } from "@mui/material/InputLabel";
import type { BaseProps } from "@stratakit/foundations/secret-internals";

// ----------------------------------------------------------------------------

interface MuiTextFieldInputLabelProps
	extends Omit<BaseProps<"label">, "color">,
		InputLabelProps {}

const MuiTextFieldInputLabel = forwardRef<"label", MuiTextFieldInputLabelProps>(
	(props, forwardedRef) => {
		const { setLabelId } = React.useContext(MuiAutocompleteContext) ?? {};

		React.useEffect(() => {
			if (!setLabelId) return;
			setLabelId(props.id);
			return () => setLabelId(undefined);
		}, [props.id, setLabelId]);
		return <InputLabel {...props} ref={forwardedRef} />;
	},
);
DEV: MuiTextFieldInputLabel.displayName = "MuiTextFieldInputLabel";

// ----------------------------------------------------------------------------

export { MuiTextFieldInputLabel };
