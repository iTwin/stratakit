/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import Stack from "@mui/material/Stack";
import ColorPickerDefault from "examples/mui/ColorPicker.default.tsx";
import { createKnob } from "~/~utils.tsx";

export default function ColorPickerExamples() {
	return (
		<Stack spacing={2}>
			<ColorPickerDefault />
		</Stack>
	);
}

export const knobs = {
	disabled: createKnob({
		props: {
			MuiFormControl: {
				disabled: true,
			},
		},
	}),
};
