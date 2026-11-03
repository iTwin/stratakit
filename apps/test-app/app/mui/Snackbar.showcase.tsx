/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import Stack from "@mui/material/Stack";
import SnackbarDefault from "examples/mui/Snackbar.default.tsx";

export default function SnackbarExamples() {
	return (
		<Stack spacing={4} sx={{ alignItems: "start" }}>
			<SnackbarDefault />
		</Stack>
	);
}
