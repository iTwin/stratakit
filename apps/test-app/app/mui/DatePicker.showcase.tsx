/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import DatePickerCalendar from "examples/mui/DatePicker.calendar.tsx";
import DatePickerDefault from "examples/mui/DatePicker.default.tsx";
import DatePickerSizes from "examples/mui/DatePicker.sizes.tsx";
import DatePickerTime from "examples/mui/DatePicker.time.tsx";

export default function DatePickerExamples() {
	return (
		<>
			<DatePickerDefault />
			<DatePickerSizes />
			<DatePickerTime />
			<DatePickerCalendar />
		</>
	);
}
