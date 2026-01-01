/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { Icon } from "@stratakit/mui";

import textAlignCenterIcon from "@stratakit/icons/text-align-center.svg";
import textAlignJustifyIcon from "@stratakit/icons/text-align-justify.svg";
import textAlignLeftIcon from "@stratakit/icons/text-align-left.svg";
import textAlignRightIcon from "@stratakit/icons/text-align-right.svg";

export default () => {
	return (
		<ToggleButtonGroup value="center" aria-label="text alignment">
			<ToggleButton value="left" aria-label="left aligned">
				<Icon href={textAlignLeftIcon} />
			</ToggleButton>
			<ToggleButton value="center" aria-label="centered">
				<Icon href={textAlignCenterIcon} />
			</ToggleButton>
			<ToggleButton value="right" aria-label="right aligned">
				<Icon href={textAlignRightIcon} />
			</ToggleButton>
			<ToggleButton value="justify" aria-label="justified" disabled>
				<Icon href={textAlignJustifyIcon} />
			</ToggleButton>
		</ToggleButtonGroup>
	);
};
