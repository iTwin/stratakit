/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";

export default () => {
	return (
		<FormControl component="fieldset">
			<FormLabel component="legend">Privacy preferences</FormLabel>
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
			<FormHelperText>You can change these settings at any time</FormHelperText>
		</FormControl>
	);
};
