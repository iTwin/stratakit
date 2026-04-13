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
		<Stack spacing={1} direction="row" sx={{ alignItems: "center" }}>
			<IconButton size="small" label="Small">
				<Icon href={svgPlaceholder} />
			</IconButton>

			<IconButton label="Medium">
				<Icon href={svgPlaceholder} />
			</IconButton>

			<IconButton size="large" label="Large">
				<Icon href={svgPlaceholder} />
			</IconButton>
		</Stack>
	);
};
