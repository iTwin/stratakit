/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";

export default () => {
	const labelId = React.useId();

	return (
		<>
			<LinearProgress aria-labelledby={labelId} />
			<Typography id={labelId}>Analyzing results…</Typography>
		</>
	);
};
