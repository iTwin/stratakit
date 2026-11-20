import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import {
	createColumnHelper,
	createSortedRowModel,
	FlexRender,
	rowSortingFeature,
	sortFn_alphanumeric,
	sortFn_basic,
	sortFn_datetime,
	sortFn_text,
	tableFeatures,
	useTable,
} from "@tanstack/react-table";
import { makeData } from "./makeData";

import type { SortDirection } from "@tanstack/react-table";
import type { Person } from "./makeData";

const features = tableFeatures({
	rowSortingFeature,
	sortedRowModel: createSortedRowModel(),
	sortFns: {
		alphanumeric: sortFn_alphanumeric,
		basic: sortFn_basic,
		datetime: sortFn_datetime,
		text: sortFn_text,
	},
});

const columnHelper = createColumnHelper<typeof features, Person>();

const data = makeData(50);

function getAriaSortDirection(sortDirection: SortDirection | false) {
	if (sortDirection === "asc") {
		return "ascending" as const;
	}
	if (sortDirection === "desc") {
		return "descending" as const;
	}
	return undefined;
}

export default function App() {
	const columns = React.useMemo(
		() =>
			columnHelper.columns([
				columnHelper.accessor("id", {
					header: "ID",
				}),
				columnHelper.accessor("firstName", {
					header: "First Name",
					cell: (info) => info.getValue(),
				}),
				columnHelper.accessor((row) => row.lastName, {
					id: "lastName",
					cell: (info) => info.getValue(),
					header: "Last Name",
				}),
				columnHelper.accessor("age", {
					header: "Age",
				}),
				columnHelper.accessor("visits", {
					header: "Visits",
				}),
				columnHelper.accessor("status", {
					header: "Status",
				}),
				columnHelper.accessor("progress", {
					header: "Profile Progress",
				}),
				columnHelper.accessor("birthDate", {
					header: "Birth Date",
					cell: (info) => info.getValue().toISOString().slice(0, 10),
				}),
			]),
		[],
	);

	const table = useTable({
		features,
		columns,
		data,
		debugTable: true,
	});

	return (
		<TableContainer>
			<Table aria-label="People">
				<TableHead>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => {
								const sortDirection = header.column.getIsSorted();
								return (
									<TableCell
										key={header.id}
										aria-sort={getAriaSortDirection(sortDirection)}
									>
										{header.isPlaceholder ? null : header.column.getCanSort() ? (
											<TableSortLabel
												active={sortDirection !== false}
												direction={sortDirection || undefined}
												onClick={header.column.getToggleSortingHandler()}
											>
												<FlexRender header={header} />
											</TableSortLabel>
										) : (
											<FlexRender header={header} />
										)}
									</TableCell>
								);
							})}
						</TableRow>
					))}
				</TableHead>
				<TableBody>
					{table.getRowModel().rows.map((row) => (
						<TableRow key={row.id}>
							{row.getAllCells().map((cell) => (
								<TableCell key={cell.id}>
									<FlexRender cell={cell} />
								</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
