/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { visuallyHidden } from "@mui/utils";
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
			>
				Group menu
			</Button>
			<Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
				<div role="group" aria-label="Group 1">
					<ListItem aria-hidden="true">Group 1</ListItem>
					<MenuItem onClick={handleClose}>Item 1</MenuItem>
					<MenuItem onClick={handleClose}>
						Item 2
						<Typography
							render={<kbd />}
							style={{
								marginLeft: "auto",
							}}
						>
							<span aria-hidden="true">⌘+X</span>
							<span style={visuallyHidden}>Command+X</span>
						</Typography>
					</MenuItem>
					<MenuItem onClick={handleClose}>Item 3</MenuItem>
				</div>
				<div role="group" aria-label="Group 2">
					<ListItem aria-hidden="true">Group 2</ListItem>
					<MenuItem onClick={handleClose}>Item 4</MenuItem>
					<MenuItem onClick={handleClose}>Item 5</MenuItem>
				</div>
			</Menu>
		</>
	);
};
