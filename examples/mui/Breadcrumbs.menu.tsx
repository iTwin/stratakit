/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { svgMoreHorizontal } from "@stratakit/icons/more-horizontal";
import { Icon } from "@stratakit/mui";

export default function CondensedWithMenu() {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<>
			<Breadcrumbs aria-label="breadcrumbs">
				<Link href="#">Breadcrumb 1</Link>
				<IconButton
					aria-haspopup="true"
					aria-expanded={open ? "true" : "false"}
					label="Show hidden breadcrumbs"
					onClick={(event) => setAnchorEl(event.currentTarget)}
				>
					<Icon href={svgMoreHorizontal} />
				</IconButton>
				<Link href="#">Breadcrumb 5</Link>
				<Link aria-current="true" color="textSecondary">
					Breadcrumb 6
				</Link>
			</Breadcrumbs>
			<Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
				<MenuItem onClick={handleClose}>Breadcrumb 2</MenuItem>
				<MenuItem onClick={handleClose}>Breadcrumb 3</MenuItem>
				<MenuItem onClick={handleClose}>Breadcrumb 4</MenuItem>
			</Menu>
		</>
	);
}
