/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Paper from "@mui/material/Paper";

export default () => {
	return (
		<Paper
			sx={{ minInlineSize: "128px", minBlockSize: "128px" }}
			variant="outlined"
		/>
	);
};
