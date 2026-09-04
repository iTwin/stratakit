/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

export default () => {
	return (
		<Divider>
			<Typography variant="subtitle-md" render={<h3 />} noWrap>
				New messages
			</Typography>
		</Divider>
	);
};
