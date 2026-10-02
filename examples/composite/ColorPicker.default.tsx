/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Input from "@mui/material/Input";

export default () => {
	const [color, setColor] = React.useState("#188166");

	return (
		<FormControlLabel
			label="Color"
			labelPlacement="start"
			control={
				<Input
					type="color"
					value={color}
					onChange={(e) => setColor(e.target.value)}
				/>
			}
		/>
	);
};
