/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";

export default () => {
	return (
		<Stack spacing={4} sx={{ alignSelf: "center" }}>
			<Tooltip placement="bottom" title="I am below the button">
				<Button disabled>Bottom</Button>
			</Tooltip>

			<Tooltip placement="right" title="I am to the right of the button">
				<Button disabled>Right</Button>
			</Tooltip>

			<Tooltip placement="left" title="I am to the left of the button">
				<Button disabled>Left</Button>
			</Tooltip>

			<Tooltip placement="top" title="I am above the button">
				<Button disabled>Top</Button>
			</Tooltip>
		</Stack>
	);
};
