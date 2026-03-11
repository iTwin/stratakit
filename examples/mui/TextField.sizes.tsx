/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

export default () => {
	return (
		<Stack spacing={1} direction="row" alignItems="center">
			<TextField size="small" label="Small" />
			<TextField size="medium" label="Medium" />
		</Stack>
	);
};
