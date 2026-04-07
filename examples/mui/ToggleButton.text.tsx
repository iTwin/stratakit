/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export default () => {
	return (
		<ToggleButtonGroup value="auto" aria-label="color scheme">
			<ToggleButton value="auto">Auto</ToggleButton>
			<ToggleButton value="light">Light</ToggleButton>
			<ToggleButton value="dark">Dark</ToggleButton>
		</ToggleButtonGroup>
	);
};
