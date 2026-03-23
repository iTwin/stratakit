/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import visuallyHidden from "@mui/utils/visuallyHidden";

export default () => {
	return (
		<Stack flexGrow={1} alignSelf="stretch">
			<Skeleton />
			<div style={visuallyHidden}>Loading...</div>
		</Stack>
	);
};
