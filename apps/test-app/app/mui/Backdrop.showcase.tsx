/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import Stack from "@mui/material/Stack";
import BackdropDefault from "examples/mui/Backdrop.default.tsx";

export default function BackdropExamples() {
	return (
		<Stack spacing={4} sx={{ alignItems: "start" }}>
			<BackdropDefault />
		</Stack>
	);
}
