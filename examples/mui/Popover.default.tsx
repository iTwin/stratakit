/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";

import styles from "./Popover.default.module.css";

export default () => {
	const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
		null,
	);
	const [open, setOpen] = React.useState(false);
	const buttonId = React.useId();
	const dialogId = React.useId();
	return (
		<>
			<Button
				id={buttonId}
				aria-haspopup="dialog"
				aria-controls={dialogId}
				aria-expanded={open}
				onClick={() => setOpen(true)}
				ref={setAnchorEl}
			>
				Open popover
			</Button>
			<Popover
				id={dialogId}
				role="dialog"
				aria-labelledby={buttonId}
				open={open}
				anchorEl={anchorEl}
				onClose={() => setOpen(false)}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "left",
				}}
				slotProps={{
					paper: {
						className: styles.popover,
					},
				}}
			>
				The content of the Popover.
			</Popover>
		</>
	);
};
