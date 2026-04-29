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
		<Stack spacing={1} direction="row" sx={{ alignItems: "center" }}>
			<SmallSelect />
			<MediumSelect />
		</Stack>
	);
};

const SmallSelect = () => {
	const id = React.useId();
	const label = "Favorite small animal:";
	return (
		<FormControl>
			<InputLabel id={id}>{label}</InputLabel>
			<Select labelId={id} label={label} defaultValue={1} size="small">
				<MenuItem value={1}>Mouse</MenuItem>
				<MenuItem value={2}>Worm</MenuItem>
			</Select>
		</FormControl>
	);
};

const MediumSelect = () => {
	const id = React.useId();
	const label = "Favorite medium animal:";
	return (
		<FormControl>
			<InputLabel id={id}>{label}</InputLabel>
			<Select labelId={id} label={label} defaultValue={1}>
				<MenuItem value={1}>Cat</MenuItem>
				<MenuItem value={2}>Dog</MenuItem>
			</Select>
		</FormControl>
	);
};
