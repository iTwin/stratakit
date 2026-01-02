/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { useState } from "react";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { Icon } from "@stratakit/mui";

import clockIcon from "@stratakit/icons/clock.svg";
import heartIcon from "@stratakit/icons/heart.svg";
import locationIcon from "@stratakit/icons/location.svg";

export default () => {
	const [value, setValue] = useState(0);
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
				icon={<Icon href={`${clockIcon}#icon-large`} size="large" />}
			/>
			<BottomNavigationAction
				label="Favorites"
				icon={<Icon href={`${heartIcon}#icon-large`} size="large" />}
			/>
			<BottomNavigationAction
				label="Nearby"
				icon={<Icon href={`${locationIcon}#icon-large`} size="large" />}
			/>
		</BottomNavigation>
	);
};
