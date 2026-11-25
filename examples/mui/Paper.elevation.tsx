/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";

import styles from "./Paper.elevation.module.css";

export default () => {
	return (
		<Stack
			spacing={2}
			direction="row"
			sx={{ alignItems: "center", inlineSize: "100%" }}
		>
			{/* One elevation per shadow/surface token range: xs, sm, md, lg, xl */}
			{[0, 1, 4, 8, 16, 24].map((elevation) => (
				<Paper key={elevation} className={styles.paper} elevation={elevation}>
					{elevation}
				</Paper>
			))}
		</Stack>
	);
};
