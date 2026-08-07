/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import Stack from "@mui/material/Stack";
import MobileStepperDefault from "examples/mui/MobileStepper.default.tsx";

export default function MobileStepperExamples() {
	return (
		<Stack spacing={2} sx={{ alignSelf: "stretch" }}>
			<MobileStepperDefault />
		</Stack>
	);
}
