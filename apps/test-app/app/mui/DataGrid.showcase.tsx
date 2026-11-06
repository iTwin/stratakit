/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Stack from "@mui/material/Stack";
import DataGridDataTypes from "examples/mui/DataGrid.datatypes.tsx";
import DataGridDefault from "examples/mui/DataGrid.default.tsx";
import DataGridNonSelectable from "examples/mui/DataGrid.nonselectable.tsx";

export default function DataGridShowcase() {
	return (
		<Stack spacing={4}>
			<DataGridDefault />
			<DataGridDataTypes />
			<DataGridNonSelectable />
		</Stack>
	);
}

export const Simple = DataGridDefault;
export const DataTypes = DataGridDataTypes;
