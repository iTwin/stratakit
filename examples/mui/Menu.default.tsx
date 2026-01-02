/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { useId, useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";

export default () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClose = () => {
		setAnchorEl(null);
	};

	const buttonId = useId();
	const menuId = useId();

	return (
		<>
			<Button
				variant="contained"
				id={buttonId}
				aria-controls={open ? menuId : undefined}
				aria-haspopup="true"
				aria-expanded={open ? "true" : undefined}
				onClick={(event) => setAnchorEl(event.currentTarget)}
			>
				Open menu
			</Button>
			<Menu
				id={menuId}
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				slotProps={{
					list: {
						"aria-labelledby": buttonId,
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
