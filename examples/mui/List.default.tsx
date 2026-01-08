/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Icon } from "@stratakit/mui";

import inboxIcon from "@stratakit/icons/inbox.svg";
import statusDraftIcon from "@stratakit/icons/status-draft.svg";

export default () => {
	return (
		<List>
			<ListItem disablePadding>
				<ListItemButton>
					<ListItemIcon>
						<Icon href={inboxIcon} />
					</ListItemIcon>
					<ListItemText primary="Inbox" />
				</ListItemButton>
			</ListItem>
			<ListItem disablePadding>
				<ListItemButton>
					<ListItemIcon>
						<Icon href={statusDraftIcon} />
					</ListItemIcon>
					<ListItemText primary="Drafts" />
				</ListItemButton>
			</ListItem>
		</List>
	);
};
