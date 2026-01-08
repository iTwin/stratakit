/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export default () => {
	const labelId = React.useId();
	const label = "Choose a design system:";
	return (
		<FormControl style={{ minInlineSize: 250 }}>
			<InputLabel id={labelId}>{label}</InputLabel>
			<Select labelId={labelId} label={label} defaultValue={2}>
				<MenuItem value={1}>iTwinUI</MenuItem>
				<MenuItem value={2}>StrataKit</MenuItem>
				<MenuItem value={3}>Other</MenuItem>
			</Select>
		</FormControl>
	);
};
