/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { Icon } from "@stratakit/mui";

import svgClock from "@stratakit/icons/clock.svg";
import svgHeart from "@stratakit/icons/heart.svg";
import svgLocation from "@stratakit/icons/location.svg";

export default () => {
	const [value, setValue] = React.useState(0);
	return (
		<BottomNavigation
			showLabels
			value={value}
			onChange={(_, newValue) => {
				setValue(newValue);
			}}
		>
			<BottomNavigationAction
				label="Recents"
				icon={<Icon href={`${svgClock}#icon-large`} size="large" />}
			/>
			<BottomNavigationAction
				label="Favorites"
				icon={<Icon href={`${svgHeart}#icon-large`} size="large" />}
			/>
			<BottomNavigationAction
				label="Nearby"
				icon={<Icon href={`${svgLocation}#icon-large`} size="large" />}
			/>
		</BottomNavigation>
	);
};
