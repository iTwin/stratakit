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
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

export default () => {
	const [open, setOpen] = React.useState(false);
	const formId = React.useId();

	const handleClose = () => {
		setOpen(false);
	};

	const handleSubmit = () => {};

	return (
		<>
			<Button onClick={() => setOpen(true)}>Open full screen dialog</Button>
			<Dialog open={open} onClose={handleClose} fullScreen>
				<DialogTitle>New message</DialogTitle>
				<DialogContent>
					<DialogContentText>
						<form onSubmit={handleSubmit} id={formId}>
							<Stack direction="column" spacing={2}>
								<TextField label="Subject" required />
								<TextField label="Message" multiline required />
							</Stack>
						</form>
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button type="submit" form={formId} color="primary">
						Send
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};
