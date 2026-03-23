/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import FormControlLabel from "@mui/material/FormControlLabel";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";

export default () => {
	return (
		<Stack spacing={1}>
			<FormControlLabel control={<Switch />} label="Medium" />
			<FormControlLabel control={<Switch size="small" />} label="Small" />
		</Stack>
	);
};
