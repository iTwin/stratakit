/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

export default () => {
	return (
		<Stack spacing={2} direction="row" useFlexGap sx={{ flexWrap: "wrap" }}>
			<Button color="primary">Primary</Button>
			<Button color="secondary">Secondary</Button>
			<Button color="error">Error</Button>
		</Stack>
	);
};
