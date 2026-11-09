/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Stack from "@mui/material/Stack";
import DialogDefault from "examples/mui/Dialog.default.tsx";
import DialogFullScreen from "examples/mui/Dialog.fullScreen.tsx";

export default function DialogExamples() {
	return (
		<Stack spacing={4} sx={{ alignItems: "start" }}>
			<DialogDefault />
			<DialogFullScreen />
		</Stack>
	);
}
