/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { useFormControl } from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";

import type { OutlinedInputProps } from "@mui/material/OutlinedInput";

// ----------------------------------------------------------------------------

const MuiSelectSizeContext = React.createContext<string | undefined>(undefined);

// ----------------------------------------------------------------------------

const MuiSelectInput = React.forwardRef<HTMLDivElement, OutlinedInputProps>(
	(props, forwardedRef) => {
		const formControl = useFormControl();
		const size = props.size ?? formControl?.size ?? "medium";

		return (
			<MuiSelectSizeContext.Provider value={size}>
				<OutlinedInput {...props} ref={forwardedRef} />
			</MuiSelectSizeContext.Provider>
		);
	},
);
DEV: MuiSelectInput.displayName = "MuiSelectInput";

// ----------------------------------------------------------------------------

export { MuiSelectInput, MuiSelectSizeContext };
