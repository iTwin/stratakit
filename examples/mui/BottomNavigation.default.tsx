/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { svgClockLarge } from "@stratakit/icons/clock";
import { svgHeartLarge } from "@stratakit/icons/heart";
import { svgLocationLarge } from "@stratakit/icons/location";
import { Icon } from "@stratakit/mui";

export default () => {
	const [value, setValue] = React.useState(0);
	return (
		<BottomNavigation
			value={value}
			onChange={(_, newValue) => {
				setValue(newValue);
			}}
		>
			<BottomNavigationAction
				label="Recents"
				icon={<Icon href={svgClockLarge} size="large" />}
			/>
			<BottomNavigationAction
				label="Favorites"
				icon={<Icon href={svgHeartLarge} size="large" />}
			/>
			<BottomNavigationAction
				label="Nearby"
				icon={<Icon href={svgLocationLarge} size="large" />}
			/>
		</BottomNavigation>
	);
};
