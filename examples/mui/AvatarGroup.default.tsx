/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";

export default () => {
	return (
		<AvatarGroup
			max={4}
			renderSurplus={(surplus) => (
				<Avatar aria-label={`${surplus} more users`} role="img">
					<abbr aria-hidden="true">+{surplus}</abbr>
				</Avatar>
			)}
		>
			<Avatar aria-label="Keith Bentley" role="img">
				<abbr aria-hidden="true">KB</abbr>
			</Avatar>
			<Avatar aria-label="Barry Bentley" role="img">
				<abbr aria-hidden="true">BB</abbr>
			</Avatar>
			<Avatar aria-label="Greg Bentley" role="img">
				<abbr aria-hidden="true">GB</abbr>
			</Avatar>
			<Avatar aria-label="Ray Bentley" role="img">
				<abbr aria-hidden="true">RB</abbr>
			</Avatar>
			<Avatar aria-label="Scott Bentley" role="img">
				<abbr aria-hidden="true">SB</abbr>
			</Avatar>
		</AvatarGroup>
	);
};
