/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";

import styles from "./ColorPicker.default.module.css";

export default () => {
	const inputId = React.useId();
	const [color, setColor] = React.useState("#188166");

	return (
		<FormControl className={styles.root}>
			<InputLabel htmlFor={inputId}>Color</InputLabel>
			<Input
				id={inputId}
				type="color"
				value={color}
				onChange={(e) => setColor(e.target.value)}
			/>
		</FormControl>
	);
};
