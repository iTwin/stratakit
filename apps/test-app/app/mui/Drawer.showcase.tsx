/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import Stack from "@mui/material/Stack";
import DrawerComprehensive_ from "examples/mui/Drawer._comprehensive.tsx";
import DrawerDefault from "examples/mui/Drawer.default.tsx";

export default function DrawerExamples() {
	return (
		<Stack spacing={4} sx={{ alignItems: "start" }}>
			<DrawerDefault />
			<DrawerComprehensive_ />
		</Stack>
	);
}
