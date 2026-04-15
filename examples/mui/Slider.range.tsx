/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Slider from "@mui/material/Slider";

const marks = [
	{
		value: 0,
		label: "0°C",
	},
	{
		value: 20,
		label: "20°C",
	},
	{
		value: 40,
		label: "40°C",
	},
	{
		value: 60,
		label: "60°C",
	},
	{
		value: 80,
		label: "80°C",
	},
	{
		value: 100,
		label: "100°C",
	},
];

function valuetext(value: number) {
	return `${value}°C`;
}

export default () => {
	const id = React.useId();
	return (
		<FormControl fullWidth>
			<FormLabel htmlFor={id}>Temperature range</FormLabel>
			<Slider
				marks={marks}
				valueLabelDisplay="auto"
				defaultValue={[40, 60]}
				getAriaValueText={valuetext}
				slotProps={{ input: { id } }}
			/>
		</FormControl>
	);
};
