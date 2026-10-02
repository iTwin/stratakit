var e=`/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Popover from "@mui/material/Popover";
import { svgMoreHorizontal } from "@stratakit/icons/more-horizontal";
import { Icon } from "@stratakit/mui";

import styles from "./Breadcrumbs.truncation.module.css";

export default () => {
	const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
		null,
	);
	const [open, setOpen] = React.useState(false);
	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			<Breadcrumbs aria-label="breadcrumbs">
				<Link href="#">Workspace</Link>
				<IconButton
					aria-haspopup="dialog"
					aria-expanded={open}
					label="Show collapsed breadcrumbs"
					onClick={() => setOpen(true)}
					ref={setAnchorEl}
				>
					<Icon href={svgMoreHorizontal} />
				</IconButton>
				<Link href="#">Navigation</Link>
				<Link aria-current="true" color="textSecondary">
					Breadcrumbs
				</Link>
			</Breadcrumbs>
			<Popover
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "left",
				}}
				slotProps={{
					paper: {
						className: styles.popover,
						"aria-label": "Collapsed breadcrumbs",
					},
				}}
			>
				<Breadcrumbs render={<div />}>
					<Link href="#" onClick={handleClose}>
						Projects
					</Link>
					<Link href="#" onClick={handleClose}>
						Design System
					</Link>
					<Link href="#" onClick={handleClose}>
						Components
					</Link>
				</Breadcrumbs>
			</Popover>
		</>
	);
};
`;export{e as default};