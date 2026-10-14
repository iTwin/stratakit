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
import { svgSmileyVeryHappy } from "@stratakit/icons/smiley-very-happy";
import { svgSmileyVerySad } from "@stratakit/icons/smiley-very-sad";
import { Icon } from "@stratakit/mui";

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
			<Stack spacing={2} direction="column-reverse">
				<Icon href={svgSmileyVerySad} />
				<Slider
					orientation="vertical"
					style={{ height: 100 }}
					defaultValue={50}
					slotProps={{ input: { id } }}
				/>
				<Icon href={svgSmileyVeryHappy} />
			</Stack>
		</FormControl>
	);
};
