/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { svgChevronDown } from "@stratakit/icons/chevron-down";
import { svgChevronUp } from "@stratakit/icons/chevron-up";
import { svgPlaceholder } from "@stratakit/icons/placeholder";
import { Icon } from "@stratakit/mui";

export default () => {
	const [open, setOpen] = React.useState(false);

	const handleClick = () => {
		setOpen(!open);
	};

	return (
		<List disablePadding dense>
			<ListItem disablePadding>
				<ListItemButton render={<a />} nativeButton={false}>
					<ListItemIcon>
						<Icon href={svgPlaceholder} />
					</ListItemIcon>
					<ListItemText primary="Item 1" />
				</ListItemButton>
			</ListItem>
			<ListItem disablePadding>
				<ListItemButton render={<a />} nativeButton={false}>
					<ListItemIcon>
						<Icon href={svgPlaceholder} />
					</ListItemIcon>
					<ListItemText primary="Item 2" />
				</ListItemButton>
			</ListItem>
			<ListItem disablePadding>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						flexGrow: 1,
					}}
				>
					<ListItemButton onClick={handleClick}>
						<ListItemIcon>
							<Icon href={svgPlaceholder} />
						</ListItemIcon>
						<ListItemText primary="Item 3" />
						<Icon href={open ? svgChevronUp : svgChevronDown} />
					</ListItemButton>
					<Collapse in={open} timeout="auto" unmountOnExit>
						<List disablePadding>
							{/* Use ::before pseudo element */}
							<div
								role="presentation"
								style={{
									borderInlineStart:
										"1px solid var(--stratakit-color-border-page-base)",
									borderRadius: "var(--stratakit-radius-sm)",
									position: "absolute",
									insetBlock: 0,
									insetInlineStart: "var(--stratakit-space-500)",
								}}
							/>
							<ListItem disablePadding>
								<ListItemButton render={<a />} nativeButton={false}>
									{/* Use ::before pseudo element */}
									<div
										role="presentation"
										style={{
											inlineSize: "var(--stratakit-space-400)",
										}}
									/>
									<ListItemIcon>
										<Icon href={svgPlaceholder} />
									</ListItemIcon>
									<ListItemText primary="Item 3.1" />
								</ListItemButton>
							</ListItem>
							<ListItem disablePadding>
								<ListItemButton selected render={<a />} nativeButton={false}>
									{/* Use ::before pseudo element */}
									<div
										role="presentation"
										style={{
											inlineSize: "var(--stratakit-space-400)",
										}}
									/>
									<ListItemIcon>
										<Icon href={svgPlaceholder} />
									</ListItemIcon>
									<ListItemText primary="Item 3.2" />
									{/* Use ::after pseudo element */}
									<div
										role="presentation"
										style={{
											position: "absolute",
											inset: "unset",
											blockSize: "1rem",
											inlineSize: 2,
											insetInlineStart: "var(--stratakit-space-500)",
											transform: "translate(-.5px)",
											backgroundColor: "currentColor",
										}}
									/>
								</ListItemButton>
							</ListItem>
						</List>
					</Collapse>
				</div>
			</ListItem>
		</List>
	);
};
