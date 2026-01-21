/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { Icon } from "@stratakit/mui";

import svgDownload from "@stratakit/icons/download.svg";

export default () => {
	return (
		<Tooltip title="Download" describeChild={false}>
			<IconButton>
				<Icon href={svgDownload} />
			</IconButton>
		</Tooltip>
	);
};
