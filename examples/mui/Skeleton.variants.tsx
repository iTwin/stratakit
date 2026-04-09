/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import visuallyHidden from "@mui/utils/visuallyHidden";

export default () => {
	return (
		<Stack spacing={1} direction="column">
			<Skeleton variant="circular" width={40} height={40} />
			<Skeleton variant="rectangular" />
			<Skeleton variant="rounded" />
			<Skeleton variant="text" />
			<div style={visuallyHidden}>Loading…</div>
		</Stack>
	);
};
