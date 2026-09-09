var e=`/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { Icon } from "@stratakit/mui";

import svgBold from "@stratakit/icons/font-bold.svg";
import svgItalic from "@stratakit/icons/font-italic.svg";
import svgStrikethrough from "@stratakit/icons/font-strikethrough.svg";
import svgUnderline from "@stratakit/icons/font-underline.svg";

export default () => {
	const [formats, setFormats] = React.useState(["bold"]);
	return (
		<ToggleButtonGroup
			value={formats}
			onChange={(_, newFormats) => setFormats(newFormats)}
			aria-label="Text formatting"
		>
			<ToggleButton value="bold" label="Bold">
				<Icon href={svgBold} />
			</ToggleButton>
			<ToggleButton value="italic" label="Italic">
				<Icon href={svgItalic} />
			</ToggleButton>
			<ToggleButton value="underline" label="Underline">
				<Icon href={svgUnderline} />
			</ToggleButton>
			<ToggleButton value="strikethrough" label="Strikethrough">
				<Icon href={svgStrikethrough} />
			</ToggleButton>
		</ToggleButtonGroup>
	);
};
`;export{e as default};