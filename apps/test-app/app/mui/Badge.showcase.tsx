/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import Stack from "@mui/material/Stack";
import BadgeColors from "examples/mui/Badge.colors.tsx";
import BadgeDefault from "examples/mui/Badge.default.tsx";
import BadgeDot from "examples/mui/Badge.dot.tsx";
import BadgeInline from "examples/mui/Badge.inline.tsx";
import BadgeSizes from "examples/mui/Badge.sizes.tsx";
import BadgeType from "examples/mui/Badge.type.tsx";

export default function BadgeExamples() {
	return (
		<Stack spacing={4} sx={{ alignItems: "start" }}>
			<BadgeDefault />
			<BadgeDot />
			<BadgeInline />
			<BadgeSizes />
			<BadgeColors />
			<BadgeType />
		</Stack>
	);
}
