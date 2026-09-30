/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import { svgNotificationsLarge } from "@stratakit/icons/notifications";
import { Icon } from "@stratakit/mui";

export default () => {
	const descriptionId = React.useId();
	return (
		<IconButton label="Notifications" aria-describedby={descriptionId}>
			<Badge variant="dot">
				<Icon href={svgNotificationsLarge} size="large" />
				<span id={descriptionId} hidden>
					You have 4 unread notifications
				</span>
			</Badge>
		</IconButton>
	);
};
