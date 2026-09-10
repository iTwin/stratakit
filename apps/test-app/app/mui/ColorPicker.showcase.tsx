/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import ColorPickerDefault from "examples/mui/ColorPicker.default.tsx";
import { createKnob } from "~/~utils.tsx";

export default function ColorPickerExamples() {
	return <ColorPickerDefault />;
}

export const knobs = {
	disabled: createKnob({
		props: {
			MuiButton: {
				disabled: true,
			},
		},
	}),
};
