/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import Tooltip from "@mui/material/Tooltip";
import { Icon } from "@stratakit/mui";

import svgDismiss from "@stratakit/icons/dismiss.svg";

export default () => {
	const [open, setOpen] = React.useState(false);

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			<Button onClick={() => setOpen(true)}>Archive</Button>
			<Snackbar
				open={open}
				onClose={handleClose}
				message="Note archived"
				action={
					<Tooltip title="Close" describeChild={false}>
						<IconButton onClick={handleClose}>
							<Icon href={svgDismiss} />
						</IconButton>
					</Tooltip>
				}
			/>
		</>
	);
};
