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
import { svgWindowZoomIn } from "@stratakit/icons/window-zoom-in";
import { svgWindowZoomOut } from "@stratakit/icons/window-zoom-out";
import { Icon } from "@stratakit/mui";

export default () => {
	const [open, setOpen] = React.useState(false);
	const [fullScreen, setFullScreen] = React.useState(false);

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			<Button onClick={() => setOpen(true)}>Release notes</Button>
			<Dialog open={open} onClose={handleClose} fullScreen={fullScreen}>
				<DialogTitle
					actions={
						<>
							<IconButton
								label={fullScreen ? "Reset size" : "Maximize"}
								onClick={() => setFullScreen(!fullScreen)}
							>
								<Icon href={fullScreen ? svgWindowZoomOut : svgWindowZoomIn} />
							</IconButton>
							<IconButton label="Dismiss" onClick={handleClose} edge="end">
								<Icon href={svgDismiss} />
							</IconButton>
						</>
					}
				>
					Release notes
				</DialogTitle>
				<DialogContent>
					<DialogContentText>
						The release notes contain extensive information about the updates,
						changes, and improvements made to StrataKit. Maximize this dialog
						for a more comfortable reading experience.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Close
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};
