/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import NativeSelect from "@mui/material/NativeSelect";

export default () => {
	const id = React.useId();
	return (
		<FormControl>
			<InputLabel variant="standard" htmlFor={id}>
				Design system
			</InputLabel>
			<NativeSelect
				defaultValue="stratakit"
				inputProps={{
					id,
				}}
			>
				<option value="itwinui">iTwinUI</option>
				<option value="stratakit">StrataKit</option>
				<option value="other">Other</option>
			</NativeSelect>
		</FormControl>
	);
};
