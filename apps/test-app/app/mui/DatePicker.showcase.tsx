/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import Stack from "@mui/material/Stack";
import DatePickerCalendar from "examples/mui/DatePicker.calendar.tsx";
import DatePickerDefault from "examples/mui/DatePicker.default.tsx";
import DatePickerSizes from "examples/mui/DatePicker.sizes.tsx";
import DatePickerTime from "examples/mui/DatePicker.time.tsx";
import { createKnob, DefaultPropsProvider } from "~/~utils.tsx";

export default function DatePickerExamples({ monthSelector = false }) {
	return (
		<DefaultPropsProvider
			value={{
				MuiDatePicker: {
					...(monthSelector && { views: ["year", "month", "day"] }),
				},
				MuiDateCalendar: {
					...(monthSelector && { views: ["year", "month", "day"] }),
				},
			}}
		>
			<Stack spacing={4} sx={{ alignItems: "start" }}>
				<DatePickerDefault />
				<DatePickerSizes />
				<DatePickerTime />
				<DatePickerCalendar />
			</Stack>
		</DefaultPropsProvider>
	);
}

export const knobs = {
	monthSelector: createKnob({ type: "boolean" }),
};
