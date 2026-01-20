/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { IconButton } from "@stratakit/bricks";
import notificationsIcon from "@stratakit/icons/notifications.svg";

export default () => {
	return (
		<IconButton
			label="Notifications"
			dot="You have unread notifications"
			icon={notificationsIcon}
		/>
	);
};
