/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import styles from "./SkipToContent.default.module.css";

export default () => {
	const mainId = React.useId();

	return (
		<>
			<Button href={`#${mainId}`} className={styles.skipLink}>
				Skip to main content
			</Button>

			<Stack direction="row" spacing={2}>
				<Link href="#">Home</Link>
				<Link href="#">Projects</Link>
				<Link href="#">Settings</Link>
			</Stack>

			<Typography id={mainId} tabIndex={-1}>
				Click the top of this example, then press <kbd>Tab</kbd> to see the skip
				link.
			</Typography>
		</>
	);
};
