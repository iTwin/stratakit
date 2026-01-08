/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Paper from "@mui/material/Paper";

export default () => {
	return (
		<Paper elevation={4} style={{ minBlockSize: 128, minInlineSize: 128 }} />
	);
};
