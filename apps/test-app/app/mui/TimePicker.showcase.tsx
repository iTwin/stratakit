/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import TimePickerDefault from "examples/mui/TimePicker.default.tsx";
import { createKnob } from "~/~utils.tsx";

export default function TimePickerExamples() {
	return <TimePickerDefault />;
}

export const knobs = {
	disabled: createKnob({
		props: {
			MuiTimePicker: {
				disabled: true,
			},
		},
	}),
};
