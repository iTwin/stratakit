/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export default () => {
	return (
		<Stack>
			<Typography>Item</Typography>
			<Divider flexItem margin />
			<Typography>Item</Typography>
			<Divider flexItem margin />
			<Typography>Item</Typography>
		</Stack>
	);
};
