/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

export default () => {
	return (
		<Stack spacing={1} direction="row" alignItems="center">
			<Chip label="Small" size="small" />
			<Chip label="Medium" size="medium" />
		</Stack>
	);
};
