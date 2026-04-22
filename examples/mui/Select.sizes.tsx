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
	const smallId = React.useId();
	const mediumId = React.useId();

	return (
		<Stack spacing={1} direction="row" sx={{ alignItems: "center" }}>
			<FormControl>
				<InputLabel id={smallId}>Favorite small animal:</InputLabel>
				<Select labelId={smallId} defaultValue={1} size="small">
					<MenuItem value={1}>Mouse</MenuItem>
					<MenuItem value={2}>Worm</MenuItem>
				</Select>
			</FormControl>

			<FormControl>
				<InputLabel id={mediumId}>Favorite medium animal:</InputLabel>
				<Select labelId={mediumId} defaultValue={1}>
					<MenuItem value={1}>Cat</MenuItem>
					<MenuItem value={2}>Dog</MenuItem>
				</Select>
			</FormControl>
		</Stack>
	);
};
