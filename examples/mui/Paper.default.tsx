/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Paper from "@mui/material/Paper";

import styles from "./Paper.default.module.css";

export default () => {
	return <Paper className={styles.paper} elevation={4} />;
};
