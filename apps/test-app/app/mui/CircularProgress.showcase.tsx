/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import CircularProgressColors from "examples/mui/CircularProgress.colors.tsx";
import CircularProgressDefault from "examples/mui/CircularProgress.default.tsx";
import CircularProgressDeterminate from "examples/mui/CircularProgress.determinate.tsx";

export default function CircularProgressExamples() {
	return (
		<>
			<CircularProgressDefault />
			<CircularProgressColors />
			<CircularProgressDeterminate />
		</>
	);
}

export function UnsupportedColors() {
	return (
		<Stack
			direction="row"
			spacing={2}
			sx={{ display: "inline-flex" }}
			data-testid="unsupported-colors"
		>
			{/* @ts-expect-error intentionally invalid value to test uses by Non-stratakit consumers*/}
			<CircularProgress color="inherit" />
			{/* @ts-expect-error intentionally invalid value to test uses by Non-stratakit consumers*/}
			<CircularProgress color="info" />
		</Stack>
	);
}
