/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import IconButton from "@mui/material/IconButton";
import { svgAddLarge } from "@stratakit/icons/add";
import { svgDeleteLarge } from "@stratakit/icons/delete";
import { svgEditLarge } from "@stratakit/icons/edit";
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
