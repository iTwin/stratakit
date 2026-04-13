/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { Icon } from "@stratakit/mui";

import svgTextAlignCenter from "@stratakit/icons/text-align-center.svg";
import svgTextAlignJustify from "@stratakit/icons/text-align-justify.svg";
import svgTextAlignLeft from "@stratakit/icons/text-align-left.svg";
import svgTextAlignRight from "@stratakit/icons/text-align-right.svg";

export default () => {
	return (
		<ToggleButtonGroup value="center" aria-label="text alignment">
			<ToggleButton value="left" label="Left aligned">
				<Icon href={svgTextAlignLeft} />
			</ToggleButton>
			<ToggleButton value="center" label="Centered">
				<Icon href={svgTextAlignCenter} />
			</ToggleButton>
			<ToggleButton value="right" label="Right aligned">
				<Icon href={svgTextAlignRight} />
			</ToggleButton>
			<ToggleButton value="justify" label="Justified">
				<Icon href={svgTextAlignJustify} />
			</ToggleButton>
		</ToggleButtonGroup>
	);
};
