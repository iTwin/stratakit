/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

export default () => {
	const labelId = React.useId();

	return (
		<>
			<CircularProgress aria-labelledby={labelId} />
			<Typography id={labelId}>Analyzing results…</Typography>
		</>
	);
};
