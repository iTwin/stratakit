/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Stack from "@mui/material/Stack";
import DialogConfirmation from "examples/mui/Dialog.confirmation.tsx";
import DialogDefault from "examples/mui/Dialog.default.tsx";
import DialogHeaderActions from "examples/mui/Dialog.header-actions.tsx";
import DialogNonModal from "examples/mui/Dialog.non-modal.tsx";

export default function DialogExamples() {
	return (
		<Stack spacing={4} sx={{ alignItems: "start" }}>
			<DialogDefault />
			<DialogNonModal />
			<DialogConfirmation />
			<DialogHeaderActions />
		</Stack>
	);
}
