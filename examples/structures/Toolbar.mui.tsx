/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ToggleButton from "@mui/material/ToggleButton";
import { Icon } from "@stratakit/mui";
import { unstable_Toolbar as Toolbar } from "@stratakit/structures";

import svgAdd from "@stratakit/icons/add.svg";
import svgEdit from "@stratakit/icons/edit.svg";
import svgSaveSettings from "@stratakit/icons/save-settings.svg";

export default () => {
	const [autoSave, setAutoSave] = React.useState(true);
	return (
		<Toolbar.Group variant="solid">
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
			<Divider flexItem orientation="vertical" />
			<Toolbar.Item
				render={
					<ToggleButton
						value="settings"
						label="Toggle Auto Save"
						selected={autoSave}
						onChange={() => setAutoSave((prev) => !prev)}
					>
						<Icon href={`${svgSaveSettings}#icon-large`} size="large" />
					</ToggleButton>
				}
			/>
		</Toolbar.Group>
	);
};
