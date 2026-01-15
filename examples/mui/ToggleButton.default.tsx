/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Tooltip from "@mui/material/Tooltip";
import { Icon } from "@stratakit/mui";

import textAlignCenterIcon from "@stratakit/icons/text-align-center.svg";
import textAlignJustifyIcon from "@stratakit/icons/text-align-justify.svg";
import textAlignLeftIcon from "@stratakit/icons/text-align-left.svg";
import textAlignRightIcon from "@stratakit/icons/text-align-right.svg";

export default () => {
	return (
		<ToggleButtonGroup value="center" aria-label="text alignment">
			<Tooltip title="Left aligned" describeChild={false}>
				<ToggleButton value="left">
					<Icon href={textAlignLeftIcon} />
				</ToggleButton>
			</Tooltip>
			<Tooltip title="Centered" describeChild={false}>
				<ToggleButton value="center">
					<Icon href={textAlignCenterIcon} />
				</ToggleButton>
			</Tooltip>
			<Tooltip title="Right aligned" describeChild={false}>
				<ToggleButton value="right">
					<Icon href={textAlignRightIcon} />
				</ToggleButton>
			</Tooltip>
			<Tooltip title="Justified" describeChild={false}>
				<ToggleButton value="justify">
					<Icon href={textAlignJustifyIcon} />
				</ToggleButton>
			</Tooltip>
		</ToggleButtonGroup>
	);
};
