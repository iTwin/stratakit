/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Fab from "@mui/material/Fab";
import Tooltip from "@mui/material/Tooltip";
import { Icon } from "@stratakit/mui";

import svgAdd from "@stratakit/icons/add.svg";

export default () => {
	return (
		<Tooltip title="Add documents" describeChild={false}>
			<Fab>
				<Icon href={svgAdd} />
			</Fab>
		</Tooltip>
	);
};
