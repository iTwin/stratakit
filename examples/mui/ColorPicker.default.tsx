/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";

export default () => {
	const [color, setColor] = React.useState("#188166");
	const id = React.useId();

	return (
		<FormControl>
			<InputLabel htmlFor={id}>Color</InputLabel>
			<Input
				id={id}
				type="color"
				value={color}
				onChange={(e) => setColor(e.target.value)}
			/>
		</FormControl>
	);
};
