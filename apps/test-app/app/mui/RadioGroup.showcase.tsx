/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import RadioGroupDefault from "examples/mui/RadioGroup.default.tsx";
import RadioGroupDefaultValue from "examples/mui/RadioGroup.defaultValue.tsx";
import RadioGroupError from "examples/mui/RadioGroup.error.tsx";
import RadioTiles from "examples/mui/RadioGroup.tiles.tsx";
import { createKnob } from "~/~utils.tsx";

export default function RadioGroupExamples() {
	return (
		<>
			<RadioGroupDefault />
			<RadioGroupDefaultValue />
			<RadioGroupError />
			<RadioTiles />
		</>
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
	row: createKnob({
		props: {
			MuiFormGroup: {
				row: true,
			},
		},
	}),
};
