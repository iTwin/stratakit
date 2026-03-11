/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import { Icon } from "@stratakit/mui";

import svgPlaceholder from "@stratakit/icons/placeholder.svg";

export default () => {
	return (
		<Stack spacing={1} direction="row" alignItems="center">
			<Tooltip title="Large" describeChild={false}>
				<IconButton size="small">
					<Icon href={svgPlaceholder} />
				</IconButton>
			</Tooltip>

			<Tooltip title="Medium" describeChild={false}>
				<IconButton>
					<Icon href={svgPlaceholder} />
				</IconButton>
			</Tooltip>

			<Tooltip title="Large" describeChild={false}>
				<IconButton size="large">
					<Icon href={svgPlaceholder} />
				</IconButton>
			</Tooltip>
		</Stack>
	);
};
