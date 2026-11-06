/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { svgFontBold } from "@stratakit/icons/font-bold";
import { svgFontItalic } from "@stratakit/icons/font-italic";
import { svgFontStrikethrough } from "@stratakit/icons/font-strikethrough";
import { svgFontUnderline } from "@stratakit/icons/font-underline";
import { Icon } from "@stratakit/mui";

export default () => {
	const [formats, setFormats] = React.useState(["bold"]);
	return (
		<ToggleButtonGroup
			value={formats}
			onChange={(_, newFormats) => setFormats(newFormats)}
			aria-label="Text formatting"
		>
			<ToggleButton value="bold" label="Bold">
				<Icon href={svgFontBold} />
			</ToggleButton>
			<ToggleButton value="italic" label="Italic">
				<Icon href={svgFontItalic} />
			</ToggleButton>
			<ToggleButton value="underline" label="Underline">
				<Icon href={svgFontUnderline} />
			</ToggleButton>
			<ToggleButton value="strikethrough" label="Strikethrough">
				<Icon href={svgFontStrikethrough} />
			</ToggleButton>
		</ToggleButtonGroup>
	);
};
