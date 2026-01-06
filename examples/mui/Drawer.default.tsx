/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { useState } from "react";
import {
	Button,
	Drawer,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from "@mui/material";
import { Icon } from "@stratakit/mui";

import emailIcon from "@stratakit/icons/email.svg";
import starIcon from "@stratakit/icons/star.svg";
import statusDraftIcon from "@stratakit/icons/status-draft.svg";

export default () => {
	const [open, setOpen] = useState(false);

	return (
		<>
			<Button onClick={() => setOpen(true)}>Open drawer</Button>
			<Drawer open={open} onClose={() => setOpen(false)}>
				<List style={{ minInlineSize: 250 }}>
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
			</Drawer>
		</>
	);
};
