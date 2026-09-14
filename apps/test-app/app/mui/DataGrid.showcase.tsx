/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import DataGridDataTypes from "examples/mui/DataGrid.datatypes.tsx";
import DataGridDefault from "examples/mui/DataGrid.default.tsx";

export default function DatePickerExamples() {
	return (
		<Stack divider={<Divider />}>
			<DataGridDefault />
			<DataGridDataTypes />
		</Stack>
	);
}
