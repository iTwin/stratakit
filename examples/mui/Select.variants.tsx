/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";

export default () => {
	return (
		<Stack spacing={2} direction="row" sx={{ flexWrap: "wrap" }}>
			<OutlinedSelect />
			<FilledSelect />
		</Stack>
	);
};

const OutlinedSelect = () => {
	const id = React.useId();
	const label = "Outlined";
	return (
		<FormControl>
			<InputLabel id={id}>{label}</InputLabel>
			<Select variant="outlined" labelId={id} label={label} defaultValue={1}>
				<MenuItem value={1}>Stencil</MenuItem>
				<MenuItem value={2}>Coloring book</MenuItem>
			</Select>
		</FormControl>
	);
};

const FilledSelect = () => {
	const id = React.useId();
	const label = "Filled";
	return (
		<FormControl>
			<InputLabel id={id}>{label}</InputLabel>
			<Select variant="filled" labelId={id} label={label} defaultValue={1}>
				<MenuItem value={1}>Burrito</MenuItem>
				<MenuItem value={2}>Jelly donut</MenuItem>
			</Select>
		</FormControl>
	);
};
