/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { svgAddLarge } from "@stratakit/icons/add";
import { svgDeleteLarge } from "@stratakit/icons/delete";
import { svgEditLarge } from "@stratakit/icons/edit";
import { svgSaveLarge } from "@stratakit/icons/save";
import { Icon } from "@stratakit/mui";
import { unstable_Toolbar as Toolbar } from "@stratakit/structures";

export default () => {
	return (
		<Toolbar.Group variant="solid">
			<Toolbar.Item
				render={
					<IconButton label="Add">
						<Icon href={svgAddLarge} size="large" />
					</IconButton>
				}
			/>
			<Toolbar.Item
				render={
					<IconButton label="Edit">
						<Icon href={svgEditLarge} size="large" />
					</IconButton>
				}
			/>
			<Divider orientation="vertical" flexItem margin variant="middle" />
			<Toolbar.Item
				render={
					<IconButton label="Save">
						<Icon href={svgSaveLarge} size="large" />
					</IconButton>
				}
			/>
			<Toolbar.Item
				render={
					<IconButton label="Delete">
						<Icon href={svgDeleteLarge} size="large" />
					</IconButton>
				}
			/>
		</Toolbar.Group>
	);
};
