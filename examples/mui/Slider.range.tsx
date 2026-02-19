/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Slider from "@mui/material/Slider";

export default () => {
	const id = React.useId();
	return (
		<FormControl fullWidth>
			<FormLabel htmlFor={id}>Temperature range</FormLabel>
			<Slider defaultValue={[60, 70]} slotProps={{ input: { id } }} />
		</FormControl>
	);
};
