/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import Stack from "@mui/material/Stack";
import CheckboxChecked from "examples/mui/Checkbox.checked.tsx";
import CheckboxDefault from "examples/mui/Checkbox.default.tsx";
import CheckboxError from "examples/mui/Checkbox.error.tsx";
import CheckboxGroup from "examples/mui/Checkbox.group.tsx";
import CheckboxIndeterminate from "examples/mui/Checkbox.indeterminate.tsx";
import { createKnob } from "~/~utils.tsx";

export default function CheckboxExamples() {
	return (
		<Stack spacing={4} sx={{ alignItems: "start" }}>
			<CheckboxDefault />
			<CheckboxChecked />
			<CheckboxIndeterminate />
			<CheckboxGroup />
			<CheckboxError />
		</Stack>
	);
}

export const knobs = {
	disabled: createKnob({
		props: {
			MuiFormControl: {
				disabled: true,
			},
			MuiFormControlLabel: {
				disabled: true,
			},
		},
	}),
};
