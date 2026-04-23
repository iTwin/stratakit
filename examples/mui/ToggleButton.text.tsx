/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import Button from "@mui/material/Button";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export default () => {
	const [colorScheme, setColorScheme] = React.useState("auto");
	return (
		<ToggleButtonGroup
			value={colorScheme}
			onChange={(_, newColorScheme) => {
				if (newColorScheme === null) {
					setColorScheme("auto");
					return;
				}
				setColorScheme(newColorScheme);
			}}
			exclusive
			aria-label="color scheme"
		>
			<ToggleButton value="auto" render={<Button variant="outlined" />}>
				Auto
			</ToggleButton>
			<ToggleButton value="light" render={<Button variant="outlined" />}>
				Light
			</ToggleButton>
			<ToggleButton value="dark" render={<Button variant="outlined" />}>
				Dark
			</ToggleButton>
		</ToggleButtonGroup>
	);
};
