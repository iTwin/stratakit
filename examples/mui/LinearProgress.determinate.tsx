/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Stack from "@mui/material/Stack";
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
			<LinearProgress
				aria-labelledby={labelId}
				value={value}
				variant="determinate"
			/>
			<Stack direction="row" sx={{ justifyContent: "space-between" }}>
				<Typography id={labelId}>Uploading…</Typography>
				<Typography>{value}%</Typography>
			</Stack>
		</>
	);
};
