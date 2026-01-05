/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { ToggleButton, ToggleButtonGroup, Tooltip } from "@mui/material";
import { Icon } from "@stratakit/mui";

import textAlignCenterIcon from "@stratakit/icons/text-align-center.svg";
import textAlignJustifyIcon from "@stratakit/icons/text-align-justify.svg";
import textAlignLeftIcon from "@stratakit/icons/text-align-left.svg";
import textAlignRightIcon from "@stratakit/icons/text-align-right.svg";

export default () => {
	return (
		<ToggleButtonGroup value="center" aria-label="text alignment">
			<Tooltip title="Left aligned">
				<ToggleButton value="left">
					<Icon href={textAlignLeftIcon} />
				</ToggleButton>
			</Tooltip>
			<Tooltip title="Centered">
				<ToggleButton value="center">
					<Icon href={textAlignCenterIcon} />
				</ToggleButton>
			</Tooltip>
			<Tooltip title="Right aligned">
				<ToggleButton value="right">
					<Icon href={textAlignRightIcon} />
				</ToggleButton>
			</Tooltip>
			<Tooltip title="Justified">
				<ToggleButton value="justify" disabled>
					<Icon href={textAlignJustifyIcon} />
				</ToggleButton>
			</Tooltip>
		</ToggleButtonGroup>
	);
};
