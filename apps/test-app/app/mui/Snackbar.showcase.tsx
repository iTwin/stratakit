/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import SnackbarDefault from "examples/mui/Snackbar.default.tsx";
import SnackbarProcessing from "examples/mui/Snackbar.processing.tsx";
import SnackbarStatus from "examples/mui/Snackbar.status.tsx";

export default function SnackbarExamples() {
	return (
		<>
			<SnackbarDefault />
			<SnackbarProcessing />
			<SnackbarStatus />
		</>
	);
}
