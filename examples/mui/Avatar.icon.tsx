/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Avatar from "@mui/material/Avatar";
import { svgUser } from "@stratakit/icons/user";
import { Icon } from "@stratakit/mui";

export default () => {
	return (
		<Avatar aria-label="Kit Stratan" role="img">
			<Icon href={svgUser} />
		</Avatar>
	);
};
