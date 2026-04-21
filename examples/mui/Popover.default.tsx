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
	return (
		<>
			<Button
				id={buttonId}
				aria-haspopup="dialog"
				aria-expanded={open}
				onClick={() => setOpen(true)}
				ref={setAnchorEl}
			>
				Open popover
			</Button>
			<Popover
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
						// note that the paper slot gets role="dialog" from the theme, so labelling by the button
						// ensures that the dialog is labeled by the button text
						"aria-labelledby": buttonId,
					},
				}}
			>
				The content of the Popover.
			</Popover>
		</>
	);
};
