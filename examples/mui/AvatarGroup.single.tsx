/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";

export default () => {
	return (
		<AvatarGroup>
			<Avatar aria-label="John Doe" role="img">
				<abbr aria-hidden="true">J</abbr>
			</Avatar>
		</AvatarGroup>
	);
};
