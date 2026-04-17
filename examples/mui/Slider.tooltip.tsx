/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";
import { visuallyHidden } from "@mui/utils";
import { Icon } from "@stratakit/mui";

import svgSoundLoud from "@stratakit/icons/sound-loud.svg";
import svgSoundQuiet from "@stratakit/icons/sound-quiet.svg";

export default () => {
	const id = React.useId();
	return (
		<FormControl fullWidth>
			<FormLabel htmlFor={id}>
				Volume
				<span style={visuallyHidden}> from 0 to 100</span>
			</FormLabel>
			<Stack spacing={1} direction="row" sx={{ alignItems: "center", mb: 1 }}>
				<Icon href={svgSoundQuiet} />
				<Slider
					valueLabelDisplay="auto"
					defaultValue={50}
					slotProps={{ input: { id } }}
				/>
				<Icon href={svgSoundLoud} />
			</Stack>
		</FormControl>
	);
};
