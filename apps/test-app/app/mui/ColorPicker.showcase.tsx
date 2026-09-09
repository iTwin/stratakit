/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import ColorPickerDefault from "examples/mui/ColorPicker.default.tsx";
import ColorPickerSelect from "examples/mui/ColorPicker.select.tsx";
import ColorPickerTextField from "examples/mui/ColorPicker.textfield.tsx";
import { createKnob } from "~/~utils.tsx";

export default function ColorPickerExamples() {
	return (
		<>
			<ColorPickerDefault />
			<ColorPickerTextField />
			<ColorPickerSelect />
		</>
	);
}

export const knobs = {
	disabled: createKnob({
		props: {
			MuiButton: {
				disabled: true,
			},
			MuiFormControl: {
				disabled: true,
			},
			MuiIconButton: {
				disabled: true,
			},
			MuiTextField: {
				disabled: true,
			},
		},
	}),
};
