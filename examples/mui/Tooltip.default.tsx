/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { IconButton, Tooltip } from "@mui/material";
import { Icon } from "@stratakit/mui";

import downloadIcon from "@stratakit/icons/download.svg";

export default () => {
	return (
		<Tooltip title="Download">
			<IconButton>
				<Icon href={downloadIcon} />
			</IconButton>
		</Tooltip>
	);
};
