var e=`/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export default () => {
	const labelId = React.useId();
	const progress = 50;

	return (
		<>
			<LinearProgress
				variant="determinate"
				value={progress}
				aria-labelledby={labelId}
			/>
			<Stack direction="row" sx={{ justifyContent: "space-between" }}>
				<Typography id={labelId}>Uploading…</Typography>
				<Typography>{progress}%</Typography>
			</Stack>
		</>
	);
};
`;export{e as default};