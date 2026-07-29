/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import SelectDefault from "examples/mui/Select.default.tsx";
import SelectIcon from "examples/mui/Select.icon.tsx";
import SelectMultiple from "examples/mui/Select.multiple.tsx";
import SelectSizes from "examples/mui/Select.sizes.tsx";
import { createKnob } from "~/~utils.tsx";

export default function SelectExamples() {
	return (
		<>
			<SelectDefault />
			<SelectIcon />
			<SelectMultiple />
			<SelectSizes />
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
