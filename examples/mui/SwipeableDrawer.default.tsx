/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { Icon } from "@stratakit/mui";

import emailIcon from "@stratakit/icons/email.svg";
import starIcon from "@stratakit/icons/star.svg";
import statusDraftIcon from "@stratakit/icons/status-draft.svg";

export default () => {
	const [open, setOpen] = React.useState(false);

	return (
		<>
			<Button onClick={() => setOpen(true)}>Open drawer</Button>
			<SwipeableDrawer
				anchor="left"
				open={open}
				onOpen={() => setOpen(true)}
				onClose={() => setOpen(false)}
			>
				<List>
					<ListItem disablePadding>
						<ListItemButton>
							<ListItemIcon>
								<Icon href={`${emailIcon}#icon-large`} size="large" />
							</ListItemIcon>
							<ListItemText primary="Inbox" />
						</ListItemButton>
					</ListItem>
					<ListItem disablePadding>
						<ListItemButton>
							<ListItemIcon>
								<Icon href={`${starIcon}#icon-large`} size="large" />
							</ListItemIcon>
							<ListItemText primary="Starred" />
						</ListItemButton>
					</ListItem>
					<ListItem disablePadding>
						<ListItemButton>
							<ListItemIcon>
								<Icon href={`${statusDraftIcon}#icon-large`} size="large" />
							</ListItemIcon>
							<ListItemText primary="Drafts" />
						</ListItemButton>
					</ListItem>
				</List>
			</SwipeableDrawer>
		</>
	);
};
