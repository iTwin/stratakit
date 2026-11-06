/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { svgEmailLarge } from "@stratakit/icons/email";
import { svgStarLarge } from "@stratakit/icons/star";
import { svgStatusDraftLarge } from "@stratakit/icons/status-draft";
import { Icon } from "@stratakit/mui";

import styles from "./Drawer.default.module.css";

export default () => {
	const [open, setOpen] = React.useState(false);

	return (
		<>
			<Button onClick={() => setOpen(true)}>Open drawer</Button>
			<Drawer open={open} onClose={() => setOpen(false)}>
				<List className={styles.list}>
					<ListItem disablePadding>
						<ListItemButton>
							<ListItemIcon>
								<Icon href={svgEmailLarge} size="large" />
							</ListItemIcon>
							<ListItemText primary="Inbox" />
						</ListItemButton>
					</ListItem>
					<ListItem disablePadding>
						<ListItemButton>
							<ListItemIcon>
								<Icon href={svgStarLarge} size="large" />
							</ListItemIcon>
							<ListItemText primary="Starred" />
						</ListItemButton>
					</ListItem>
					<ListItem disablePadding>
						<ListItemButton>
							<ListItemIcon>
								<Icon href={svgStatusDraftLarge} size="large" />
							</ListItemIcon>
							<ListItemText primary="Drafts" />
						</ListItemButton>
					</ListItem>
				</List>
			</Drawer>
		</>
	);
};
