/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import Stack from "@mui/material/Stack";
import SwipeableDrawerDefault from "examples/mui/SwipeableDrawer.default.tsx";

export default function SwipeableDrawerExamples() {
	return (
		<Stack spacing={4} sx={{ alignItems: "start" }}>
			<SwipeableDrawerDefault />
		</Stack>
	);
}
