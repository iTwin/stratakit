/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import RadioGroupDefault from "examples/mui/RadioGroup.default.tsx";
import RadioGroupError from "examples/mui/RadioGroup.error.tsx";
import { createKnob } from "~/~utils.tsx";

export default function RadioGroupExamples() {
	return (
		<>
			<RadioGroupDefault />
			<RadioGroupError />
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
};
