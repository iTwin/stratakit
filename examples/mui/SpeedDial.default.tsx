/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import { Icon } from "@stratakit/mui";

import addIcon from "@stratakit/icons/add.svg";
import copyIcon from "@stratakit/icons/copy.svg";
import shareIcon from "@stratakit/icons/share.svg";

export default () => {
	return (
		<SpeedDial
			ariaLabel="Speed dial actions"
			icon={
				<SpeedDialIcon
					icon={<Icon href={`${addIcon}#icon-large`} size="large" />}
				/>
			}
		>
			<SpeedDialAction
				icon={<Icon href={`${copyIcon}#icon-large`} size="large" />}
				slotProps={{
					tooltip: {
						title: "Copy",
					},
				}}
			/>
			<SpeedDialAction
				icon={<Icon href={`${shareIcon}#icon-large`} size="large" />}
				slotProps={{
					tooltip: {
						title: "Share",
					},
				}}
			/>
		</SpeedDial>
	);
};
