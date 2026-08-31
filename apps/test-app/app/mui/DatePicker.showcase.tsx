/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import DatePickerCalendar from "examples/mui/DatePicker.calendar.tsx";
import DatePickerDefault from "examples/mui/DatePicker.default.tsx";
import DatePickerSizes from "examples/mui/DatePicker.sizes.tsx";
import { createKnob } from "~/~utils.tsx";

export default function DatePickerExamples() {
	return (
		<>
			<DatePickerDefault />
			<DatePickerSizes />
			<DatePickerCalendar />
		</>
	);
}

export const knobs = {
	disabled: createKnob({
		props: {
			MuiDatePicker: {
				disabled: true,
			},
		},
	}),
	showDaysOutsideCurrentMonth: createKnob({
		props: {
			MuiDateCalendar: {
				showDaysOutsideCurrentMonth: true,
			},
			MuiDatePicker: {
				showDaysOutsideCurrentMonth: true,
			},
		},
	}),
	disableAllDaysDateCalendar: createKnob({
		props: {
			MuiDateCalendar: {
				shouldDisableDate: () => true,
			},
		},
	}),
};
