/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { Icon } from "@stratakit/mui";

import svgNotifications from "@stratakit/icons/notifications.svg";

export default () => {
	const descriptionId = React.useId();
	return (
		<Tooltip title="Notifications" describeChild={false}>
			<IconButton aria-describedby={descriptionId}>
				<Badge badgeContent={4} color="primary">
					<Icon href={`${svgNotifications}#icon-large`} size="large" />
					<span id={descriptionId} hidden>
						You have 4 unread notifications
					</span>
				</Badge>
			</IconButton>
		</Tooltip>
	);
};
