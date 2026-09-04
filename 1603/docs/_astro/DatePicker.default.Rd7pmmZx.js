var e=`/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

export default () => {
	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<DatePicker
				label="Date"
				format="yyyy/MM/dd"
				slotProps={{
					textField: {
						helperText: "YYYY/MM/DD",
					},
				}}
			/>
		</LocalizationProvider>
	);
};
`;export{e as default};