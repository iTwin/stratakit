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
import IconButton from "@mui/material/IconButton";
import { svgDismiss } from "@stratakit/icons/dismiss";
import { Icon } from "@stratakit/mui";

export default () => {
	const [open, setOpen] = React.useState(false);

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			<Button onClick={() => setOpen(true)}>About non-modal</Button>
			<Dialog open={open} onClose={handleClose} nonModal>
				<DialogTitle
					actions={[
						<IconButton key="dismiss" label="Dismiss" onClick={handleClose}>
							<Icon href={svgDismiss} />
						</IconButton>,
					]}
				>
					What is a non-modal dialog?
				</DialogTitle>
				<DialogContent>
					<DialogContentText>
						A non-modal dialog does not block interaction with the rest of the
						application.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Got it
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};
