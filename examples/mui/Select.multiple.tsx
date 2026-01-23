/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import styles from "./Select.multiple.module.css";

export default () => {
	const labelId = React.useId();
	const label = "Choose design systems:";
	return (
		<FormControl className={styles.formControl}>
			<InputLabel id={labelId}>{label}</InputLabel>
			<Select labelId={labelId} label={label} defaultValue={[2]} multiple>
				<MenuItem value={1}>iTwinUI</MenuItem>
				<MenuItem value={2}>StrataKit</MenuItem>
				<MenuItem value={3}>Other</MenuItem>
			</Select>
		</FormControl>
	);
};
