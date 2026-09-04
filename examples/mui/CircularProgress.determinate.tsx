/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

import styles from "./CircularProgress.determinate.module.css";

export default () => {
	const labelId = React.useId();
	const progress = 50;

	return (
		<>
			<Box className={styles.container}>
				<CircularProgress
					variant="determinate"
					value={progress}
					aria-labelledby={labelId}
				/>
				<Typography variant="caption" className={styles.percentage}>
					{progress}%
				</Typography>
			</Box>
			<Typography id={labelId}>Uploading…</Typography>
		</>
	);
};
