/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { Icon } from "@stratakit/mui";
import { unstable_Toolbar as Toolbar } from "@stratakit/structures";

import svgAdd from "@stratakit/icons/add.svg";
import svgDelete from "@stratakit/icons/delete.svg";
import svgEdit from "@stratakit/icons/edit.svg";
import svgSave from "@stratakit/icons/save.svg";

export default () => {
	return (
		<Toolbar.Group variant="solid" orientation="vertical">
			<Toolbar.Item
				render={
					<IconButton label="Add">
						<Icon href={`${svgAdd}#icon-large`} size="large" />
					</IconButton>
				}
			/>
			<Toolbar.Item
				render={
					<IconButton label="Edit">
						<Icon href={`${svgEdit}#icon-large`} size="large" />
					</IconButton>
				}
			/>
			<Divider flexItem />
			<Toolbar.Item
				render={
					<IconButton label="Save">
						<Icon href={`${svgSave}#icon-large`} size="large" />
					</IconButton>
				}
			/>
			<Toolbar.Item
				render={
					<IconButton label="Delete">
						<Icon href={`${svgDelete}#icon-large`} size="large" />
					</IconButton>
				}
			/>
		</Toolbar.Group>
	);
};
