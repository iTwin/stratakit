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
			<Typography variant="h1" render={<div />}>
				H1
			</Typography>
			<Typography variant="h2" render={<div />}>
				H2
			</Typography>
			<Typography variant="h3" render={<div />}>
				H3
			</Typography>
			<Typography variant="h4" render={<div />}>
				H4
			</Typography>
			<Typography variant="h5" render={<div />}>
				H5
			</Typography>
			<Typography variant="h6" render={<div />}>
				H6
			</Typography>
			<Typography variant="inherit">inherit</Typography>
			<Typography variant="overline">overline</Typography>
			<Typography variant="subtitle1" render={<div />}>
				subtitle1
			</Typography>
			<Typography variant="subtitle2" render={<div />}>
				subtitle2
			</Typography>
		</Stack>
	);
};
