/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Fab, Tooltip } from "@mui/material";
import { Icon } from "@stratakit/mui";

import addIcon from "@stratakit/icons/add.svg";

export default () => {
	return (
		<Tooltip title="Add documents">
			<Fab>
				<Icon href={addIcon} />
			</Fab>
		</Tooltip>
	);
};
