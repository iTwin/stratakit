/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default () => {
	const [open, setOpen] = React.useState(false);

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			<Button onClick={() => setOpen(true)}>Open dialog</Button>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Important decision</DialogTitle>
				<DialogContent>
					<DialogContentText>
						{`Are you sure you want to use MUI? This decision cannot be undone.`}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>No</Button>
					<Button onClick={handleClose} color="primary">
						Yes
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};
