/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import Stack from "@mui/material/Stack";
import RadioGroupDefault from "examples/mui/RadioGroup.default.tsx";
import RadioGroupDefaultValue from "examples/mui/RadioGroup.defaultValue.tsx";
import RadioGroupError from "examples/mui/RadioGroup.error.tsx";
import { createKnob, DefaultPropsProvider } from "~/~utils.tsx";

import type { KnobProps } from "~/~utils.tsx";

export default function RadioGroupExamples({
	disabled,
	row,
}: KnobProps<typeof knobs>) {
	return (
		<DefaultPropsProvider
			value={{
				MuiFormControl: { disabled },
				MuiFormGroup: { row },
			}}
		>
			<Stack spacing={4} sx={{ alignItems: "start" }}>
				<RadioGroupDefault />
				<RadioGroupDefaultValue />
				<RadioGroupError />
			</Stack>
		</DefaultPropsProvider>
	);
}

export const knobs = {
	disabled: createKnob({ type: "boolean" }),
	row: createKnob({ type: "boolean" }),
};
