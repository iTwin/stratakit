/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { visuallyHidden } from "@mui/utils";

export default () => {
	const id = React.useId();
	return (
		<FormControl fullWidth>
			<FormLabel htmlFor={id}>
				Mood
				<span style={visuallyHidden}>
					{" "}
					from 0 (very sad) to 100 (very happy)
				</span>
			</FormLabel>
			<Stack spacing={1} direction="row" sx={{ alignItems: "center", mb: 1 }}>
				<Typography aria-hidden="true">Sad</Typography>
				<Slider defaultValue={50} slotProps={{ input: { id } }} />
				<Typography aria-hidden="true">Happy</Typography>
			</Stack>
		</FormControl>
	);
};
