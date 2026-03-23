/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import visuallyHidden from "@mui/utils/visuallyHidden";

export default () => {
	return (
		<Stack spacing={1} direction="column" flexGrow={1} alignSelf="stretch">
			<Skeleton variant="text" />
			<Skeleton variant="circular" width={40} height={40} />
			<Skeleton variant="rectangular" />
			<Skeleton variant="rounded" />
			<div style={visuallyHidden}>Loading...</div>
		</Stack>
	);
};
