/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import visuallyHidden from "@mui/utils/visuallyHidden";

export default () => {
	const errorId = React.useId();
	return (
		<FormControl render={<fieldset />} role="radiogroup" error>
			<FormLabel render={<legend />}>Gender</FormLabel>
			<RadioGroup aria-describedby={errorId} name="gender" role={undefined}>
				<FormControlLabel value="female" control={<Radio />} label="Female" />
				<FormControlLabel value="male" control={<Radio />} label="Male" />
				<FormControlLabel value="other" control={<Radio />} label="Other" />
			</RadioGroup>
			<FormHelperText id={errorId}>
				<span style={visuallyHidden}>Error: </span>
				You must select a gender.
			</FormHelperText>
		</FormControl>
	);
};
