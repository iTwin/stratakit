/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Badge, IconButton, Tooltip } from "@mui/material";
import { Icon } from "@stratakit/mui";

import emailIcon from "@stratakit/icons/email.svg";

export default () => {
	return (
		<Tooltip title="Inbox">
			<IconButton aria-description="You have 4 new messages">
				<Badge badgeContent={4} color="primary">
					<Icon href={`${emailIcon}#icon-large`} size="large" />
				</Badge>
			</IconButton>
		</Tooltip>
	);
};
