/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export default () => {
	return (
		<Stack spacing={1}>
			<Typography variant="display-lg">display-lg</Typography>
			<Typography variant="display-md">display-md</Typography>
			<Typography variant="display-sm">display-sm</Typography>
			<Typography variant="headline-lg">headline-lg</Typography>
			<Typography variant="headline-md">headline-md</Typography>
			<Typography variant="headline-sm">headline-sm</Typography>
			<Typography variant="body-lg">body-lg</Typography>
			<Typography variant="body-md">body-md</Typography>
			<Typography variant="body-sm">body-sm</Typography>
			<Typography variant="subtitle-lg">subtitle-lg</Typography>
			<Typography variant="subtitle-md">subtitle-md</Typography>
			<Typography variant="subtitle-sm">subtitle-sm</Typography>
			<Typography variant="caption-lg">caption-lg</Typography>
			<Typography variant="caption-md">caption-md</Typography>
			<Typography variant="caption-sm">caption-sm</Typography>
			<Typography variant="mono-sm">mono-sm</Typography>

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
