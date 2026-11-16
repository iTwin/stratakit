/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import NativeSelect from "@mui/material/NativeSelect";
import Stack from "@mui/material/Stack";

export default () => {
	return (
		<Stack spacing={2} direction="row" sx={{ flexWrap: "wrap" }}>
			<ContainedNativeSelect />
			<OutlinedNativeSelect />
		</Stack>
	);
};

const ContainedNativeSelect = () => {
	const inputId = React.useId();
	return (
		<FormControl>
			<InputLabel htmlFor={inputId}>Contained</InputLabel>
			<NativeSelect
				variant="contained"
				defaultValue={1}
				slotProps={{ input: { name: "contained", id: inputId } }}
			>
				<option value={1}>Burrito</option>
				<option value={2}>Jelly donut</option>
			</NativeSelect>
		</FormControl>
	);
};

const OutlinedNativeSelect = () => {
	const inputId = React.useId();
	return (
		<FormControl>
			<InputLabel htmlFor={inputId}>Outlined</InputLabel>
			<NativeSelect
				variant="outlined"
				defaultValue={1}
				slotProps={{ input: { name: "outlined", id: inputId } }}
			>
				<option value={1}>Stencil</option>
				<option value={2}>Coloring book</option>
			</NativeSelect>
		</FormControl>
	);
};
