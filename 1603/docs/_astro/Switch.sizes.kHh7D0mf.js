var e=`/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import FormControlLabel from "@mui/material/FormControlLabel";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";

export default () => {
	return (
		<Stack spacing={2} direction="row" sx={{ flexWrap: "wrap" }}>
			<FormControlLabel control={<Switch size="small" />} label="Small" />
			<FormControlLabel control={<Switch size="medium" />} label="Medium" />
		</Stack>
	);
};
`;export{e as default};