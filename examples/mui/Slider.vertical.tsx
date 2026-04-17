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

import svgHappy from "@stratakit/icons/smiley-very-happy.svg";
import svgSad from "@stratakit/icons/smiley-very-sad.svg";

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
			<Stack spacing={1} direction="column-reverse">
				<Icon href={svgSad} />
				<Slider
					orientation="vertical"
					style={{ height: 100 }}
					defaultValue={50}
					slotProps={{ input: { id } }}
				/>
				<Icon href={svgHappy} />
			</Stack>
		</FormControl>
	);
};
