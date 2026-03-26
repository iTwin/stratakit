/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Divider from "@mui/material/Divider";

import styles from "./Divider.semantic.module.css";

export default () => {
	return (
		<>
			<p>
				There are various methods of communication. This section covers a few of
				the important ones used by the project.
			</p>
			<Divider className={styles.divider} />
			<p>
				Communication stones seem to come in pairs and have mysterious
				properties:
			</p>
		</>
	);
};
