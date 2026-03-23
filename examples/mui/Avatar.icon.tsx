/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Avatar from "@mui/material/Avatar";
import { Icon } from "@stratakit/mui";

import svgUser from "@stratakit/icons/user.svg";

export default () => {
	return (
		<Avatar aria-label="Kit Stratan" role="img">
			<Icon href={svgUser} />
		</Avatar>
	);
};
