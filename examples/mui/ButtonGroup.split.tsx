/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { svgChevronDown } from "@stratakit/icons/chevron-down";
import { Icon } from "@stratakit/mui";

export default () => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClose = () => setAnchorEl(null);

	return (
		<>
			<ButtonGroup aria-label="Paste actions">
				<Button>Paste</Button>
				<IconButton
					variant="outlined"
					label="More paste actions"
					aria-haspopup="true"
					aria-expanded={open ? "true" : "false"}
					onClick={(event) => setAnchorEl(event.currentTarget)}
				>
					<Icon href={svgChevronDown} />
				</IconButton>
			</ButtonGroup>

			<Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
				<MenuItem onClick={handleClose}>Paste as plain text</MenuItem>
				<MenuItem onClick={handleClose}>Paste special</MenuItem>
			</Menu>
		</>
	);
};
