/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import Stack from "@mui/material/Stack";
import AppBarDefault from "examples/mui/AppBar.default.tsx";

export default function AppBarExamples() {
	return (
		<Stack spacing={2} sx={{ alignSelf: "stretch" }}>
			<AppBarDefault />
		</Stack>
	);
}
