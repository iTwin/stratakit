/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import NativeSelect from "@mui/material/NativeSelect";

import styles from "./Select.default.module.css";

export default () => {
	const inputId = React.useId();
	return (
		<FormControl className={styles.formControl}>
			<InputLabel variant="standard" htmlFor={inputId}>
				Choose a design system:
			</InputLabel>
			<NativeSelect
				defaultValue={30}
				inputProps={{
					name: "design-system",
					id: inputId,
				}}
			>
				<option value={1}>iTwinUI</option>
				<option value={2}>StrataKit</option>
				<option value={3}>Other</option>
			</NativeSelect>
		</FormControl>
	);
};
