/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { Badge, IconButton, Tooltip } from "@mui/material";
import { Icon } from "@stratakit/mui";

import emailIcon from "@stratakit/icons/email.svg";

export default () => {
	const descriptionId = React.useId();
	return (
		<Tooltip title="Inbox">
			<IconButton aria-describedby={descriptionId}>
				<Badge badgeContent={4} color="primary">
					<Icon href={`${emailIcon}#icon-large`} size="large" />
					<span id={descriptionId} hidden>
						You have 4 new messages
					</span>
				</Badge>
			</IconButton>
		</Tooltip>
	);
};
