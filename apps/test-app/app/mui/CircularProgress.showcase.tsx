/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import Stack from "@mui/material/Stack";
import CircularProgressColors from "examples/mui/CircularProgress.colors.tsx";
import CircularProgressDefault from "examples/mui/CircularProgress.default.tsx";
import CircularProgressDeterminate from "examples/mui/CircularProgress.determinate.tsx";

export default function CircularProgressExamples() {
	return (
		<Stack spacing={4} sx={{ alignItems: "start" }}>
			<CircularProgressDefault />
			<CircularProgressColors />
			<CircularProgressDeterminate />
		</Stack>
	);
}
