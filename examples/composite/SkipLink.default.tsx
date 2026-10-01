/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

import styles from "./SkipLink.default.module.css";

export default () => {
	const mainId = React.useId();

	return (
		<>
			<Button href={`#${mainId}`} className={styles.skipLink}>
				Skip to main content
			</Button>

			<Link href="#">This link will be skipped</Link>

			<Typography id={mainId}>
				Click the top of this example, then press <kbd>Tab</kbd> to see the skip
				link.
			</Typography>
		</>
	);
};
