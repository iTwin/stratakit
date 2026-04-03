/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import { Icon } from "@stratakit/mui";

import svgFontUnderline from "@stratakit/icons/font-underline.svg";

export default () => {
	const [selected, setSelected] = React.useState(false);
	return (
		<ToggleButton
			value="left"
			label="Underlined"
			selected={selected}
			onChange={() => {
				setSelected((prev) => !prev);
			}}
		>
			<Icon href={svgFontUnderline} />
		</ToggleButton>
	);
};
