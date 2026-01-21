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

import svgInbox from "@stratakit/icons/inbox.svg";
import svgStatusDraft from "@stratakit/icons/status-draft.svg";

export default () => {
	return (
		<List>
			<ListItem disablePadding>
				<ListItemButton>
					<ListItemIcon>
						<Icon href={svgInbox} />
					</ListItemIcon>
					<ListItemText primary="Inbox" />
				</ListItemButton>
			</ListItem>
			<ListItem disablePadding>
				<ListItemButton>
					<ListItemIcon>
						<Icon href={svgStatusDraft} />
					</ListItemIcon>
					<ListItemText primary="Drafts" />
				</ListItemButton>
			</ListItem>
		</List>
	);
};
