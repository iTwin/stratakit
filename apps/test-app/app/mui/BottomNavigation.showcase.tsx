/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import Stack from "@mui/material/Stack";
import BottomNavigationDefault from "examples/mui/BottomNavigation.default.tsx";

export default function BottomNavigationExamples() {
	return (
		<Stack spacing={2} sx={{ alignSelf: "stretch" }}>
			<BottomNavigationDefault />
		</Stack>
	);
}
