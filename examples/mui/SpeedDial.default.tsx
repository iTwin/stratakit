/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import { svgAddLarge } from "@stratakit/icons/add";
import { svgCopyLarge } from "@stratakit/icons/copy";
import { svgShareLarge } from "@stratakit/icons/share";
import { Icon } from "@stratakit/mui";

export default () => {
	return (
		<SpeedDial
			ariaLabel="Speed dial actions"
			icon={<SpeedDialIcon icon={<Icon href={svgAddLarge} size="large" />} />}
		>
			<SpeedDialAction
				icon={<Icon href={svgCopyLarge} size="large" />}
				slotProps={{
					tooltip: {
						title: "Copy",
					},
				}}
			/>
			<SpeedDialAction
				icon={<Icon href={svgShareLarge} size="large" />}
				slotProps={{
					tooltip: {
						title: "Share",
					},
				}}
			/>
		</SpeedDial>
	);
};
