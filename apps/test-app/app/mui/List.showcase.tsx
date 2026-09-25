/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import { Icon } from "@stratakit/mui";
import ListAvatar from "examples/mui/List.avatar.tsx";
import ListDefault from "examples/mui/List.default.tsx";
import ListSubheader from "examples/mui/List.subheader.tsx";

import svgRename from "@stratakit/icons/rename.svg";

export default function ListExamples() {
	return (
		<Stack spacing={2} sx={{ alignSelf: "stretch" }}>
			<ListDefault />
			<ListAvatar />
			<ListSubheader />
		</Stack>
	);
}

export function SecondaryActionPadding() {
	return (
		<List sx={{ width: "240px" }} data-testid="list">
			<ListItem
				secondaryAction={
					<IconButton label="Rename">
						<Icon href={svgRename} />
					</IconButton>
				}
			>
				<ListItemText primary="Bldg 274_Architectural_0SY71309-293-31-24_RVT2022-rev2-final.rvt" />
			</ListItem>
			<ListItem
				disablePadding
				secondaryAction={
					<IconButton label="Rename">
						<Icon href={svgRename} />
					</IconButton>
				}
			>
				<ListItemButton>
					<ListItemText primary="Bldg 274_Architectural_0SY71309-293-31-24_RVT2022-rev2-final.rvt.rvt" />
				</ListItemButton>
			</ListItem>
		</List>
	);
}
