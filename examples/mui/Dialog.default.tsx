/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { useState } from "react";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@mui/material";

export default () => {
	const [open, setOpen] = useState(false);

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			<Button variant="contained" onClick={() => setOpen(true)}>
				Open dialog
			</Button>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Important decision</DialogTitle>
				<DialogContent>
					<DialogContentText>
						{`Are you sure you want to use MUI? This decision cannot be undone.`}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>No</Button>
					<Button variant="contained" onClick={handleClose}>
						Yes
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};
