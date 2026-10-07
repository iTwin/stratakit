/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { svgRename } from "@stratakit/icons/rename";
import { Icon } from "@stratakit/mui";

export default () => {
	return (
		<List>
			<ListItem
				disablePadding
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
				<ListItemText primary="AGI_HQ.kml" />
			</ListItem>
		</List>
	);
};
