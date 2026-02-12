/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import visuallyHidden from "@mui/utils/visuallyHidden";

export default () => {
	const errorId = React.useId();
	return (
		<FormControl render={<fieldset />} error aria-describedby={errorId}>
			<FormLabel render={<legend />}>Privacy preferences</FormLabel>
			<FormGroup>
				<FormControlLabel control={<Checkbox />} label="Allow cookies" />
				<FormControlLabel
					control={<Checkbox />}
					label="Allow personalized ads"
				/>
				<FormControlLabel
					control={<Checkbox />}
					label="Allow location access"
				/>
			</FormGroup>
			<FormHelperText id={errorId}>
				<span style={visuallyHidden}>Error:</span>
				You must accept these settings to continue.
			</FormHelperText>
		</FormControl>
	);
};
