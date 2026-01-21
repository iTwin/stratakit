/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Tooltip from "@mui/material/Tooltip";
import { Icon } from "@stratakit/mui";

import svgFolder from "@stratakit/icons/folder.svg";
import svgRename from "@stratakit/icons/rename.svg";

export default () => {
	return (
		<List>
			<ListItem
				disablePadding
				secondaryAction={
					<Tooltip title="Rename" describeChild={false}>
						<IconButton>
							<Icon href={`${svgRename}#icon-large`} size="large" />
						</IconButton>
					</Tooltip>
				}
			>
				<ListItemButton>
					<ListItemAvatar>
						<Avatar>
							<Icon href={svgFolder} />
						</Avatar>
					</ListItemAvatar>
					<ListItemText primary="Folder 1" secondary="Contains 5 items" />
				</ListItemButton>
			</ListItem>
			<ListItem
				disablePadding
				secondaryAction={
					<Tooltip title="Rename" describeChild={false}>
						<IconButton>
							<Icon href={`${svgRename}#icon-large`} size="large" />
						</IconButton>
					</Tooltip>
				}
			>
				<ListItemButton>
					<ListItemAvatar>
						<Avatar>
							<Icon href={svgFolder} />
						</Avatar>
					</ListItemAvatar>
					<ListItemText primary="Folder 2" secondary="Contains 3 items" />
				</ListItemButton>
			</ListItem>
		</List>
	);
};
