/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { svgMoreHorizontal } from "@stratakit/icons/more-horizontal";
import { Icon } from "@stratakit/mui";

import styles from "./Breadcrumbs.menu.module.css";

export default function CondensedWithPopover() {
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
				<Link href="#">Breadcrumb 1</Link>
				<IconButton
					aria-haspopup="dialog"
					aria-expanded={open}
					label="Show hidden breadcrumbs"
					onClick={() => setOpen(true)}
					ref={setAnchorEl}
				>
					<Icon href={svgMoreHorizontal} />
				</IconButton>
				<Link href="#">Breadcrumb 5</Link>
				<Link aria-current="true" color="textSecondary">
					Breadcrumb 6
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
						"aria-label": "Hidden breadcrumbs",
					},
				}}
			>
				<Breadcrumbs aria-label="hidden breadcrumbs">
					<Typography aria-current="true" color="textSecondary">
						…
					</Typography>
					<Link href="#" onClick={handleClose}>
						Breadcrumb 2
					</Link>
					<Link href="#" onClick={handleClose}>
						Breadcrumb 3
					</Link>
					<Link href="#" onClick={handleClose}>
						Breadcrumb 4
					</Link>
					<Typography aria-current="true" color="textSecondary">
						…
					</Typography>
				</Breadcrumbs>
			</Popover>
		</>
	);
}
