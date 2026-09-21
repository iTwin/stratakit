/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Stack from "@mui/material/Stack";
import DialogConfirmation from "examples/mui/Dialog.confirmation.tsx";
import DialogDefault from "examples/mui/Dialog.default.tsx";
import DialogDraggable from "examples/mui/Dialog.draggable.tsx";
import DialogFullScreen from "examples/mui/Dialog.fullScreen.tsx";
import DialogHeaderActions from "examples/mui/Dialog.header-actions.tsx";

export default function DialogExamples() {
	return (
		<Stack spacing={4} sx={{ alignItems: "start" }}>
			<DialogDefault />
			<DialogConfirmation />
			<DialogHeaderActions />
			<DialogFullScreen />
			<DialogDraggable />
		</Stack>
	);
}
