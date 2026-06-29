/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Icon } from "@stratakit/mui";

import svgCaretDown from "@stratakit/icons/caret-down.svg";

export default () => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClose = () => setAnchorEl(null);

	const mainLabelId = React.useId();

	const [prCreationType, setPrCreationType] = React.useState(
		"Create pull request",
	);

	return (
		<>
			<ButtonGroup
				aria-label="Pull request options"
				color="primary"
				variant="contained"
			>
				<Button>{prCreationType}</Button>
				<Button
					aria-label="Select a type of pull request"
					aria-haspopup="true"
					aria-expanded={open ? "true" : "false"}
					onClick={(event) => setAnchorEl(event.currentTarget)}
				>
					<Icon href={svgCaretDown} />
				</Button>
			</ButtonGroup>
			<Menu
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				slotProps={{
					list: {
						"aria-labelledby": mainLabelId,
					},
				}}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "right",
				}}
				transformOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
			>
				<MenuItem
					role="menuitemradio"
					aria-checked={
						prCreationType === "Create pull request" ? "true" : "false"
					}
					selected={prCreationType === "Create pull request"}
					onClick={() => setPrCreationType("Create pull request")}
				>
					Create pull request
				</MenuItem>
				<MenuItem
					role="menuitemradio"
					aria-checked={
						prCreationType === "Draft pull request" ? "true" : "false"
					}
					selected={prCreationType === "Draft pull request"}
					onClick={() => setPrCreationType("Draft pull request")}
				>
					Draft pull request
				</MenuItem>
			</Menu>
		</>
	);
};
