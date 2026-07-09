/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import React from "react";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";

export default () => {
	const [margin, setMargin] = React.useState(true);
	const [horizontalLayout, setHorizontalLayout] = React.useState(false);

	return (
		<Stack direction={horizontalLayout ? "row" : "column"}>
			<Typography>Item</Typography>
			<Divider
				flexItem
				margin={margin}
				orientation={horizontalLayout ? "vertical" : "horizontal"}
			/>
			<FormControlLabel
				control={
					<Switch
						checked={margin}
						onChange={(event) => setMargin(event.target.checked)}
					/>
				}
				label="Margin"
			/>
			<Divider
				flexItem
				margin={margin}
				orientation={horizontalLayout ? "vertical" : "horizontal"}
			/>
			<FormControlLabel
				control={
					<Switch
						checked={horizontalLayout}
						onChange={(event) => setHorizontalLayout(event.target.checked)}
					/>
				}
				label="Vertical divider"
			/>
			<Divider
				flexItem
				margin={margin}
				orientation={horizontalLayout ? "vertical" : "horizontal"}
			/>
			<Typography>Item</Typography>
		</Stack>
	);
};
