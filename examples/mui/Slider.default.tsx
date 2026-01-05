/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { useId } from "react";
import { FormControl, FormLabel, Slider } from "@mui/material";

export default () => {
	const id = useId();
	return (
		<FormControl fullWidth>
			<FormLabel htmlFor={id}>Volume</FormLabel>
			<Slider defaultValue={70} slotProps={{ input: { id } }} />
		</FormControl>
	);
};
