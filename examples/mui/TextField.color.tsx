/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import TextField from "@mui/material/TextField";

export default () => {
	const [color, setColor] = React.useState("#188166");

	return (
		<TextField
			label="Color"
			type="color"
			value={color}
			onChange={(e) => setColor(e.target.value)}
			style={{ marginBottom: "400px", alignSelf: "flex-start" }}
		/>
	);
};
