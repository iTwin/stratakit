/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { Icon } from "@stratakit/mui";

import svgPlaceholder from "@stratakit/icons/placeholder.svg";

export default () => {
	return (
		<Stack
			spacing={2}
			direction="row"
			sx={{ alignItems: "center", flexWrap: "wrap" }}
		>
			<IconButton variant="ghost" label="Ghost">
				<Icon href={svgPlaceholder} />
			</IconButton>

			<IconButton variant="outlined" label="Outlined">
				<Icon href={svgPlaceholder} />
			</IconButton>
		</Stack>
	);
};
