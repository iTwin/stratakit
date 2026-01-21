/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { Icon } from "@stratakit/mui";

import svgEmail from "@stratakit/icons/email.svg";

export default () => {
	const descriptionId = React.useId();
	return (
		<Tooltip title="Inbox" describeChild={false}>
			<IconButton aria-describedby={descriptionId}>
				<Badge badgeContent={4} color="primary">
					<Icon href={`${svgEmail}#icon-large`} size="large" />
					<span id={descriptionId} hidden>
						You have 4 new messages
					</span>
				</Badge>
			</IconButton>
		</Tooltip>
	);
};
