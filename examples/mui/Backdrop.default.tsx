/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Button from "@mui/material/Button";

import styles from "./Backdrop.default.module.css";

export default () => {
	const [open, setOpen] = React.useState(false);

	return (
		<div>
			<Button onClick={() => setOpen(true)} variant="contained">
				Show backdrop
			</Button>
			<Backdrop
				className={styles.backdrop}
				open={open}
				onClick={() => setOpen(false)}
			/>
		</div>
	);
};
