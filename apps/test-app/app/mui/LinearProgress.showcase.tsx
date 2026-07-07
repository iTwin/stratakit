/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import Stack from "@mui/material/Stack";
import LinearProgressColors from "examples/mui/LinearProgress.colors.tsx";
import LinearProgressDefault from "examples/mui/LinearProgress.default.tsx";

export default function LinearProgressExamples() {
	return (
		<Stack spacing={1} sx={{ alignSelf: "stretch" }}>
			<LinearProgressDefault />
			<LinearProgressColors />
		</Stack>
	);
}
