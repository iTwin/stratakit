/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import DatePickerCalendar from "examples/mui/DatePicker.calendar.tsx";
import DatePickerDefault from "examples/mui/DatePicker.default.tsx";
import DatePickerMonth from "examples/mui/DatePicker.month.tsx";
import DatePickerSizes from "examples/mui/DatePicker.sizes.tsx";
import DatePickerTime from "examples/mui/DatePicker.time.tsx";
import { createKnob } from "~/~utils.tsx";

export default function DatePickerExamples() {
	return (
		<>
			<DatePickerDefault />
			<DatePickerSizes />
			<DatePickerTime />
			<DatePickerCalendar />
			<DatePickerMonth />
		</>
	);
}

export const knobs = {
	monthSelector: createKnob({
		props: {
			MuiDatePicker: {
				views: ["year", "month", "day"],
			},
			MuiDateCalendar: {
				views: ["year", "month", "day"],
			},
		},
	}),
};
