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
	const [value, setValue] = React.useState(10);

	React.useEffect(() => {
		const timer = setInterval(() => {
			setValue((prevValue) => (prevValue >= 100 ? 0 : prevValue + 10));
		}, 800);

		return () => {
			clearInterval(timer);
		};
	}, []);

	return (
		<>
			<Box sx={{ position: "relative", display: "inline-flex" }}>
				<CircularProgress
					aria-labelledby={labelId}
					variant="determinate"
					value={value}
				/>

				<Typography
					variant="caption"
					sx={{
						top: 0,
						left: 0,
						bottom: 0,
						right: 0,
						position: "absolute",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
				>{`${Math.round(value)}%`}</Typography>
			</Box>
			<Typography id={labelId}>Uploading…</Typography>
		</>
	);
};
