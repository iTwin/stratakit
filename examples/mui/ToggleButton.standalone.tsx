/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import { Icon } from "@stratakit/mui";

import svgSettings from "@stratakit/icons/settings.svg";

export default () => {
	const [selected, setSelected] = React.useState(false);
	return (
		<ToggleButton
			value="left"
			label="Settings"
			selected={selected}
			onChange={() => {
				setSelected((prev) => !prev);
			}}
		>
			<Icon href={svgSettings} />
		</ToggleButton>
	);
};
