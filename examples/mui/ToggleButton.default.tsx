/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Tooltip from "@mui/material/Tooltip";
import { Icon } from "@stratakit/mui";

import svgTextAlignCenter from "@stratakit/icons/text-align-center.svg";
import svgTextAlignJustify from "@stratakit/icons/text-align-justify.svg";
import svgTextAlignLeft from "@stratakit/icons/text-align-left.svg";
import svgTextAlignRight from "@stratakit/icons/text-align-right.svg";

export default () => {
	return (
		<ToggleButtonGroup value="center" aria-label="text alignment">
			<Tooltip title="Left aligned" describeChild={false}>
				<ToggleButton value="left">
					<Icon href={svgTextAlignLeft} />
				</ToggleButton>
			</Tooltip>
			<Tooltip title="Centered" describeChild={false}>
				<ToggleButton value="center">
					<Icon href={svgTextAlignCenter} />
				</ToggleButton>
			</Tooltip>
			<Tooltip title="Right aligned" describeChild={false}>
				<ToggleButton value="right">
					<Icon href={svgTextAlignRight} />
				</ToggleButton>
			</Tooltip>
			<Tooltip title="Justified" describeChild={false}>
				<ToggleButton value="justify">
					<Icon href={svgTextAlignJustify} />
				</ToggleButton>
			</Tooltip>
		</ToggleButtonGroup>
	);
};
