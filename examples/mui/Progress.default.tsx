/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { useId } from "react";
import { LinearProgress, Typography } from "@mui/material";

export default () => {
	const labelId = useId();

	return (
		<>
			<LinearProgress aria-labelledby={labelId} />
			<Typography id={labelId}>Analyzing results…</Typography>
		</>
	);
};
