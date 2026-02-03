/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Avatar } from "@stratakit/bricks";
import { Icon } from "@stratakit/foundations";

import userIcon from "@stratakit/icons/user.svg";

export default () => {
	return (
		<Avatar
			initials="WW"
			alt="Willow Winters"
			image={<Icon href={userIcon} />}
		/>
	);
};
