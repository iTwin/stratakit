/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export default () => {
	return (
		<Stack spacing={2} sx={{ alignItems: "start" }}>
			<Typography variant="body-md" render={<kbd />}>
				Kbd
			</Typography>
			<Typography variant="body-md" render={<code />}>
				Code
			</Typography>
			<Typography variant="body-md" render={<blockquote />}>
				Blockquote
			</Typography>
		</Stack>
	);
};
