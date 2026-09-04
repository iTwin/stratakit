/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import Stack from "@mui/material/Stack";
import LinearProgressBuffer from "examples/mui/LinearProgress.buffer.tsx";
import LinearProgressColors from "examples/mui/LinearProgress.colors.tsx";
import LinearProgressDefault from "examples/mui/LinearProgress.default.tsx";
import LinearProgressDeterminate from "examples/mui/LinearProgress.determinate.tsx";

export default function LinearProgressExamples() {
	return (
		<Stack spacing={2} sx={{ alignSelf: "stretch" }}>
			<LinearProgressDefault />
			<LinearProgressColors />
			<LinearProgressDeterminate />
			<LinearProgressBuffer />
		</Stack>
	);
}
