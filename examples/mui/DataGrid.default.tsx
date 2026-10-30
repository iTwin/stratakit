/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import Typography from "@mui/material/Typography";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";

const columns: GridColDef<(typeof rows)[number]>[] = [
	{ field: "id", headerName: "ID", width: 90 },
	{
		field: "firstName",
		headerName: "First name",
		width: 150,
	},
	{
		field: "lastName",
		headerName: "Last name",
		width: 150,
	},
	{
		field: "age",
		headerName: "Age",
		type: "number",
		width: 110,
	},
];

const rows = [
	{ id: 1, lastName: "Snow", firstName: "Jon", age: 14 },
	{ id: 2, lastName: "Lannister", firstName: "Cersei", age: 31 },
	{ id: 3, lastName: "Lannister", firstName: "Jaime", age: 31 },
	{ id: 4, lastName: "Stark", firstName: "Arya", age: 11 },
	{ id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
	{ id: 6, lastName: "Melisandre", firstName: null, age: 150 },
	{ id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
	{ id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
	{ id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

export default function DefaultExample() {
	const captionId = React.useId();
	return (
		<div role="group" aria-labelledby={captionId}>
			<Typography variant="headline-sm" id={captionId} render={<div />}>
				Game of Thrones Characters
			</Typography>
			<DataGrid
				showToolbar
				rows={rows}
				columns={columns}
				initialState={{
					pagination: {
						paginationModel: {
							pageSize: 5,
						},
					},
				}}
				pageSizeOptions={[5]}
				aria-labelledby={captionId}
			/>
		</div>
	);
}
