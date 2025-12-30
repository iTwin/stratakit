/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Checkbox, FormControlLabel } from "@mui/material";

export default () => {
	return (
		<FormControlLabel
			control={<Checkbox indeterminate />}
			label="Indeterminate"
		/>
	);
};
