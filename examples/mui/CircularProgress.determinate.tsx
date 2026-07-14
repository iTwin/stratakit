/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

export default () => {
	const labelId = React.useId();
	const progress = 50;

	return (
		<>
			<Box sx={{ position: "relative", display: "inline-flex" }}>
				<CircularProgress
					variant="determinate"
					value={progress}
					aria-labelledby={labelId}
				/>
				<Typography
					variant="caption"
					sx={{
						inset: 0,
						position: "absolute",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					{progress}%
				</Typography>
			</Box>
			<Typography id={labelId}>Uploading…</Typography>
		</>
	);
};
