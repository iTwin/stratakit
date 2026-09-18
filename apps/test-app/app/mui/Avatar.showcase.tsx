/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import Stack from "@mui/material/Stack";
import AvatarColors_ from "examples/mui/Avatar._colors.tsx";
import AvatarDecorative from "examples/mui/Avatar.decorative.tsx";
import AvatarDefault from "examples/mui/Avatar.default.tsx";
import AvatarIcon from "examples/mui/Avatar.icon.tsx";
import AvatarInitials from "examples/mui/Avatar.initials.tsx";
import { isProduction } from "~/~utils.tsx";

export default function AvatarExamples() {
	return (
		<>
			<Stack spacing={2} direction="row" sx={{ flexWrap: "wrap" }}>
				<AvatarDefault />
				<AvatarInitials />
				<AvatarIcon />
				<AvatarDecorative />
			</Stack>
			{!isProduction && <AvatarColors_ />}
		</>
	);
}
