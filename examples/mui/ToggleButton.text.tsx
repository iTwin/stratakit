/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Button from "@mui/material/Button";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export default () => {
	return (
		<ToggleButtonGroup value="auto" aria-label="color scheme">
			<ToggleButton value="auto" render={<Button />}>
				Auto
			</ToggleButton>
			<ToggleButton value="light" render={<Button />}>
				Light
			</ToggleButton>
			<ToggleButton value="dark" render={<Button />}>
				Dark
			</ToggleButton>
		</ToggleButtonGroup>
	);
};
