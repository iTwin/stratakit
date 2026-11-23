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
	type SortFn,
	sortFn_alphanumeric,
	sortFn_basic,
	sortFn_datetime,
	sortFn_text,
	tableFeatures,
	useTable,
} from "@tanstack/react-table";
import { makeData } from "./makeData";

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

const formatter = new Intl.DateTimeFormat("en-US", {
	month: "short",
	day: "numeric",
	year: "numeric",
});

const sortStatusFn: SortFn<typeof features, Person> = (
	rowA,
	rowB,
	_columnId,
) => {
	const statusA = rowA.original.status;
	const statusB = rowB.original.status;
	const statusOrder = ["single", "complicated", "relationship"];
	return statusOrder.indexOf(statusA) - statusOrder.indexOf(statusB);
};

export default function App() {
	const columns = React.useMemo(
		() =>
			columnHelper.columns([
				columnHelper.accessor("id", {
					header: "ID",
				}),
				columnHelper.accessor("firstName", {
					header: "First Name",
				}),
				columnHelper.accessor("lastName", {
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
					sortFn: sortStatusFn,
				}),
				columnHelper.accessor("progress", {
					header: "Profile Progress",
				}),
				columnHelper.accessor("birthDate", {
					header: "Birth Date",
					cell: (info) => formatter.format(info.getValue()),
				}),
			]),
		[],
	);

	const table = useTable({
		features,
		columns,
		data,
		enableMultiSort: false,
		sortDescFirst: false, // By default Tanstack has different sort orders for numbers and strings, force all to sort the way way first. See  https://tanstack.com/table/latest/docs/framework/react/guide/sorting#sorting-direction
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
									<TableCell key={header.id} sortDirection={sortDirection}>
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
