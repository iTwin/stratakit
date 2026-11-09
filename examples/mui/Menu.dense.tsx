/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { svgChevronDown } from "@stratakit/icons/chevron-down";
import { svgChevronUp } from "@stratakit/icons/chevron-up";
import { Icon } from "@stratakit/mui";

export default () => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<>
			<Button
				aria-haspopup="true"
				aria-expanded={open ? "true" : "false"}
				endIcon={<Icon href={open ? svgChevronUp : svgChevronDown} />}
				onClick={(event) => setAnchorEl(event.currentTarget)}
				size="small"
			>
				Open dense menu
			</Button>
			<Menu
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				slotProps={{
					list: {
						dense: true,
					},
				}}
			>
				<MenuItem onClick={handleClose}>Profile</MenuItem>
				<MenuItem onClick={handleClose}>My account</MenuItem>
				<MenuItem onClick={handleClose}>Logout</MenuItem>
			</Menu>
		</>
	);
};
