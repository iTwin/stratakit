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
	return (
		<Stack spacing={1} sx={{ alignSelf: "stretch" }}>
			<SmallSlider />
			<MediumSlider />
		</Stack>
	);
};

const SmallSlider = () => {
	const id = React.useId();
	return (
		<FormControl fullWidth>
			<FormLabel htmlFor={id}>
				Small size
				<span style={visuallyHidden}> from 0 to 100 inches</span>
			</FormLabel>
			<Stack spacing={1} direction="row" sx={{ alignItems: "center", mb: 1 }}>
				<Typography aria-hidden="true">0″</Typography>
				<Slider defaultValue={50} slotProps={{ input: { id } }} size="small" />
				<Typography aria-hidden="true">100″</Typography>
			</Stack>
		</FormControl>
	);
};

const MediumSlider = () => {
	const id = React.useId();
	return (
		<FormControl fullWidth>
			<FormLabel htmlFor={id}>
				Medium size
				<span style={visuallyHidden}> from 0 to 100 feet</span>
			</FormLabel>
			<Stack spacing={1} direction="row" sx={{ alignItems: "center", mb: 1 }}>
				<Typography aria-hidden="true" sx={{ textWrap: "nowrap" }}>
					0 ft
				</Typography>
				<Slider defaultValue={50} slotProps={{ input: { id } }} />
				<Typography aria-hidden="true" sx={{ textWrap: "nowrap" }}>
					100 ft
				</Typography>
			</Stack>
		</FormControl>
	);
};
