/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import Button from "@mui/material/Button";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { svgChevronDown } from "@stratakit/icons/chevron-down";
import { svgChevronRight } from "@stratakit/icons/chevron-right";
import { svgChevronUp } from "@stratakit/icons/chevron-up";
import { Icon, PortalProvider } from "@stratakit/mui";

export default () => {
	const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
	const [submenuAnchorEl, setSubmenuAnchorEl] =
		React.useState<HTMLElement | null>(null);
	const open = Boolean(anchorEl);
	const submenuOpen = Boolean(submenuAnchorEl);
	const [submenuContainer, setSubmenuContainer] =
		React.useState<HTMLElement | null>(null);

	const handleSubmenuClose = () => setSubmenuAnchorEl(null);
	const handleClose = () => {
		setSubmenuAnchorEl(null);
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
				File actions
			</Button>
			<Menu
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				slotProps={{
					paper: {
						ref: setSubmenuContainer,
					},
				}}
			>
				<MenuItem onClick={handleClose} onPointerEnter={handleSubmenuClose}>
					Rename
				</MenuItem>
				<MenuItem
					aria-haspopup="menu"
					aria-expanded={submenuOpen ? "true" : "false"}
					onClick={(event) => setSubmenuAnchorEl(event.currentTarget)}
					onPointerEnter={(event) => setSubmenuAnchorEl(event.currentTarget)}
					onKeyDown={(event) => {
						if (event.key === "ArrowRight") {
							setSubmenuAnchorEl(event.currentTarget);
						}
					}}
				>
					<ListItemText>Share</ListItemText>
					<Icon href={svgChevronRight} />
				</MenuItem>
				<MenuItem onClick={handleClose} onPointerEnter={handleSubmenuClose}>
					Delete
				</MenuItem>
				<PortalProvider container={submenuContainer}>
					<Menu
						hideBackdrop
						anchorEl={submenuAnchorEl}
						open={submenuOpen}
						onClose={(_event, reason) => {
							if (reason === "tabKeyDown" || reason === "escapeKeyDown") {
								handleClose();
								return;
							}
							handleSubmenuClose();
						}}
						onKeyDown={(event) => {
							if (event.key === "ArrowLeft") {
								handleSubmenuClose();
							}
						}}
						anchorOrigin={{ vertical: "top", horizontal: "right" }}
						transformOrigin={{ vertical: "top", horizontal: "left" }}
						slotProps={{
							root: {
								style: {
									pointerEvents: "none",
								},
							},
							paper: {
								style: {
									pointerEvents: "auto",
								},
							},
						}}
					>
						<MenuItem onClick={handleClose}>Copy link</MenuItem>
						<MenuItem onClick={handleClose}>Send by email</MenuItem>
						<MenuItem onClick={handleClose}>Invite people</MenuItem>
					</Menu>
				</PortalProvider>
			</Menu>
		</>
	);
};
