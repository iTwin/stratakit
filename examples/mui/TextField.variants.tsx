/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { TextField } from "@mui/material";

export default () => {
	return (
		<>
			<TextField label="Outlined" variant="outlined" />
			<TextField label="Filled" variant="filled" />
			<TextField label="Standard" variant="standard" />
		</>
	);
};
