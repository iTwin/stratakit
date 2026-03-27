/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import { Icon } from "@stratakit/mui";

import svgUser from "@stratakit/icons/user.svg";

export default () => {
	return (
		<Tooltip title="User profile" describeChild={false}>
			<button>
				<Avatar>
					<Icon href={svgUser} />
				</Avatar>
			</button>
		</Tooltip>
	);
};
