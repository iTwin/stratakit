/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import Stack from "@mui/material/Stack";
import AvatarGroupDefault from "examples/mui/AvatarGroup.default.tsx";
import AvatarGroupSurplus from "examples/mui/AvatarGroup.surplus.tsx";

export default function AvatarGroupExamples() {
	return (
		<Stack spacing={4} sx={{ alignItems: "start" }}>
			<AvatarGroupDefault />
			<AvatarGroupSurplus />
		</Stack>
	);
}
