/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

export default () => {
	const labelId = React.useId();
	return (
		<FormControl>
			<FormLabel id={labelId}>Choose a design system:</FormLabel>
			<RadioGroup
				aria-labelledby={labelId}
				defaultValue="StrataKit"
				name="design-system"
			>
				<FormControlLabel
					value="StrataKit"
					control={<Radio />}
					label="StrataKit"
				/>
				<FormControlLabel value="iTwinUI" control={<Radio />} label="iTwinUI" />
			</RadioGroup>
		</FormControl>
	);
};
