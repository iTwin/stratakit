var e=`/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export default () => {
	return (
		<Stack spacing={2}>
			<Typography variant="display-lg" render={<div />}>
				display-lg
			</Typography>
			<Typography variant="display-md" render={<div />}>
				display-md
			</Typography>
			<Typography variant="display-sm" render={<div />}>
				display-sm
			</Typography>
			<Typography variant="headline-lg" render={<div />}>
				headline-lg
			</Typography>
			<Typography variant="headline-md" render={<div />}>
				headline-md
			</Typography>
			<Typography variant="headline-sm" render={<div />}>
				headline-sm
			</Typography>
			<Typography variant="body-lg">body-lg</Typography>
			<Typography variant="body-md">body-md</Typography>
			<Typography variant="body-sm">body-sm</Typography>
			<Typography variant="subtitle-lg" render={<div />}>
				subtitle-lg
			</Typography>
			<Typography variant="subtitle-md" render={<div />}>
				subtitle-md
			</Typography>
			<Typography variant="subtitle-sm" render={<div />}>
				subtitle-sm
			</Typography>
			<Typography variant="caption-lg">caption-lg</Typography>
			<Typography variant="caption-md">caption-md</Typography>
			<Typography variant="caption-sm">caption-sm</Typography>
			<Typography variant="mono-sm">mono-sm</Typography>
		</Stack>
	);
};
`;export{e as default};