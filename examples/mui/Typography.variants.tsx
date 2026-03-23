/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export default () => {
	return (
		<Stack spacing={1}>
			<Typography variant="body1">Body1</Typography>
			<Typography variant="body2">Body2</Typography>
			<Typography variant="button">Button</Typography>
			<Typography variant="caption">Caption</Typography>
			<Typography variant="h1">H1</Typography>
			<Typography variant="h2">H2</Typography>
			<Typography variant="h3">H3</Typography>
			<Typography variant="h4">H4</Typography>
			<Typography variant="h5">H5</Typography>
			<Typography variant="h6">H6</Typography>
			<Typography variant="inherit">inherit</Typography>
			<Typography variant="overline">overline</Typography>
			<Typography variant="subtitle1">subtitle1</Typography>
			<Typography variant="subtitle2">subtitle2</Typography>
		</Stack>
	);
};
