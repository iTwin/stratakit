/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { definePage } from "~/~utils.tsx";
import { Avatar, AvatarGroup } from "@itwin/itwinui-react/bricks";

export const handle = { title: "AvatarGroup" };

export default definePage(
	function Page() {
		return (
			<>
				<AvatarGroup label="Sample group">
					<Avatar initials="AA" />
					<Avatar initials="BB" />
					<Avatar initials="CC" />
				</AvatarGroup>
			</>
		);
	},
	{ visual: VisualTest },
);

function VisualTest() {
	const sizes = ["small", "medium", "large", "xlarge"] as const;

	return (
		<div style={{ display: "grid", gap: 4 }}>
			{sizes.map((size) => (
				<AvatarGroup key={size} label="Sample group">
					<Avatar size={size} initials="AA" />
					<Avatar size={size} initials="BB" />
					<Avatar size={size} initials="CC" />
					<Avatar size={size} initials="DD" />
					<Avatar size={size} initials="8" />
				</AvatarGroup>
			))}
		</div>
	);
}
