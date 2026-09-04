/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import Stack from "@mui/material/Stack";
import StepperClickable from "examples/mui/Stepper.clickable.tsx";
import StepperDefault from "examples/mui/Stepper.default.tsx";
import StepperLong from "examples/mui/Stepper.long.tsx";
import StepperOptional from "examples/mui/Stepper.optional.tsx";

export default function StepperExamples() {
	return (
		<Stack spacing={8} sx={{ alignSelf: "stretch" }}>
			<StepperDefault />
			<StepperOptional />
			<StepperClickable />
			<StepperLong />
		</Stack>
	);
}
