/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Stack from "@mui/material/Stack";
import ToggleButton from "@mui/material/ToggleButton";
import { Icon } from "@stratakit/mui";

import svgPlaceholder from "@stratakit/icons/placeholder.svg";

export default () => {
	return (
		<Stack spacing={1} direction="row" sx={{ alignItems: "center" }}>
			<ToggleButton value="small" size="small" label="Small">
				<Icon href={svgPlaceholder} />
			</ToggleButton>
			<ToggleButton value="medium" label="Medium">
				<Icon href={svgPlaceholder} />
			</ToggleButton>
			<ToggleButton value="large" size="large" label="Large">
				<Icon href={svgPlaceholder} />
			</ToggleButton>
		</Stack>
	);
};
