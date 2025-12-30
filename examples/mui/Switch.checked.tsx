/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { FormControlLabel, Switch } from "@mui/material";

export default () => {
	return (
		<FormControlLabel
			control={<Switch defaultChecked />}
			label="Default checked"
		/>
	);
};
