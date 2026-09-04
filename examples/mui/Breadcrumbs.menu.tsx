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
import { Icon } from "@stratakit/mui";

import svgMore from "@stratakit/icons/more-horizontal.svg";

export default function CondensedWithMenu() {
	const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
		null,
	);
	const open = Boolean(anchorEl);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement> | null) => {
		if (event) {
			setAnchorEl(event.currentTarget);
		}
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<React.Fragment>
			<Menu
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				aria-labelledby="with-menu-demo-breadcrumbs"
			>
				<MenuItem onClick={handleClose}>Breadcrumb 2</MenuItem>
				<MenuItem onClick={handleClose}>Breadcrumb 3</MenuItem>
				<MenuItem onClick={handleClose}>Breadcrumb 4</MenuItem>
			</Menu>
			<Breadcrumbs aria-label="breadcrumbs">
				<Link href="#">Breadcrumb 1</Link>
				<IconButton label="More breadcrumbs" onClick={handleClick}>
					<Icon href={svgMore} />
				</IconButton>
				<Link href="#">Breadcrumb 5</Link>
				<Link aria-current="true" color="textSecondary">
					Breadcrumb 6
				</Link>
			</Breadcrumbs>
		</React.Fragment>
	);
}
