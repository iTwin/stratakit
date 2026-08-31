/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import DatePickerTime from "examples/mui/DatePicker.time.tsx";
import { createKnob } from "~/~utils.tsx";

export default function DatePickerExamples() {
	return <DatePickerTime />;
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
