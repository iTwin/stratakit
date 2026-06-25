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
				<span role="img" aria-label={`+${surplus} more`}>
					+{surplus}
				</span>
			)}
		>
			<Avatar aria-label="John Doe" role="img">
				<abbr aria-hidden="true">J</abbr>
			</Avatar>
			<Avatar aria-label="Kit Stratan" role="img">
				<abbr aria-hidden="true">K</abbr>
			</Avatar>
			<Avatar aria-label="Ava Groupie" role="img">
				<abbr aria-hidden="true">A</abbr>
			</Avatar>
			<Avatar aria-label="Des Systemer" role="img">
				<abbr aria-hidden="true">D</abbr>
			</Avatar>
			<Avatar aria-label="Libby Compone" role="img">
				<abbr aria-hidden="true">L</abbr>
			</Avatar>
		</AvatarGroup>
	);
};
