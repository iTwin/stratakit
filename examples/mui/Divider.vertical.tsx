/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Divider from "@mui/material/Divider";

import styles from "./Divider.vertical.module.css";

export default () => {
	return <Divider className={styles.divider} orientation="vertical" />;
};
