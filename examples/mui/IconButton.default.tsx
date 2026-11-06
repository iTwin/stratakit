/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import IconButton from "@mui/material/IconButton";
import { svgDownload } from "@stratakit/icons/download";
import { Icon } from "@stratakit/mui";

export default () => {
	return (
		<IconButton label="Download">
			<Icon href={svgDownload} />
		</IconButton>
	);
};
