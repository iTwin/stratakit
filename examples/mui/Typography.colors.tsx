/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export default () => {
	return (
		<Stack direction="row" spacing={2} useFlexGap sx={{ flexWrap: "wrap" }}>
			<Typography color="textPrimary">Text Primary</Typography>
			<Typography color="textSecondary">Text Secondary</Typography>
			<Typography color="textTertiary">Text Tertiary</Typography>
			<Typography color="textDisabled">Text Disabled</Typography>
			<Typography color="primary">Primary</Typography>
			<Typography color="error">Error</Typography>
			<Typography color="info">Info</Typography>
			<Typography color="success">Success</Typography>
			<Typography color="warning">Warning</Typography>
		</Stack>
	);
};
