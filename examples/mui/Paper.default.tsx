/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Paper } from "@mui/material";

export default () => {
	return <Paper elevation={4} sx={{ minBlockSize: 128, minInlineSize: 128 }} />;
};
