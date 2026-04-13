/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

export default () => {
	return (
		<Stack spacing={1} direction="row">
			<Button variant="contained">Contained</Button>
			<Button variant="outlined">Outlined</Button>
			<Button variant="text">Text</Button>
		</Stack>
	);
};
