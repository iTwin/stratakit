/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import { Icon } from "@stratakit/mui";

import svgNotifications from "@stratakit/icons/notifications.svg";

export default () => {
	const descriptionId = React.useId();
	return (
		<IconButton label="Notifications" aria-describedby={descriptionId}>
			<Badge badgeContent={4} color="primary">
				<Icon href={`${svgNotifications}#icon-large`} size="large" />
				<span id={descriptionId} hidden>
					You have 4 unread notifications
				</span>
			</Badge>
		</IconButton>
	);
};
