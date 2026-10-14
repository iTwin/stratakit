/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import IconButton from "@mui/material/IconButton";
import ToggleButton from "@mui/material/ToggleButton";
import { svgAddLarge } from "@stratakit/icons/add";
import { svgEditLarge } from "@stratakit/icons/edit";
import { svgSaveSettingsLarge } from "@stratakit/icons/save-settings";
import { Icon } from "@stratakit/mui";
import { unstable_Toolbar as Toolbar } from "@stratakit/structures";

export default () => {
	const [autoSave, setAutoSave] = React.useState(true);
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
					<ToggleButton
						value="settings"
						label="Toggle Auto Save"
						selected={autoSave}
						onChange={() => setAutoSave((prev) => !prev)}
					>
						<Icon href={svgSaveSettingsLarge} size="large" />
					</ToggleButton>
				}
			/>
		</Toolbar.Group>
	);
};
