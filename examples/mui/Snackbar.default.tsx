/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { useState } from "react";
import { Button, Snackbar } from "@mui/material";

export default () => {
	const [open, setOpen] = useState(false);

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			<Button variant="contained" onClick={() => setOpen(true)}>
				Archive
			</Button>
			<Snackbar
				open={open}
				autoHideDuration={6000}
				onClose={handleClose}
				message="Note archived"
			/>
		</>
	);
};
