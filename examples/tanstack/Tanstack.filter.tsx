/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TablePaginationActions from "@mui/material/TablePaginationActions";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import {
	columnFilteringFeature,
	createColumnHelper,
	createFilteredRowModel,
	createPaginatedRowModel,
	filterFn_equalsString,
	filterFn_includesString,
	filterFn_inDateRange,
	filterFn_inNumberRange,
	metaHelper,
	rowPaginationFeature,
	tableFeatures,
	useTable,
} from "@tanstack/react-table";
import { makeData } from "./makeData";

import type { TextFieldProps } from "@mui/material/TextField";
import type { Column } from "@tanstack/react-table";
import type { Person } from "./makeData";

import style from "./Tanstack.filter.module.css";

// allows us to define custom properties for our columns
interface MyColumnMeta {
	filterVariant?: "text" | "range" | "select" | "dateRange";
}

const features = tableFeatures({
	columnFilteringFeature,
	rowPaginationFeature,
	filteredRowModel: createFilteredRowModel(),
	paginatedRowModel: createPaginatedRowModel(),
	filterFns: {
		includesString: filterFn_includesString,
		inNumberRange: filterFn_inNumberRange,
		inDateRange: filterFn_inDateRange,
		equalsString: filterFn_equalsString,
	},
	columnMeta: metaHelper<MyColumnMeta>(),
});

const columnHelper = createColumnHelper<typeof features, Person>();
const data = makeData();

export default function TanstackFilter() {
	const columns = React.useMemo(
		() =>
			columnHelper.columns([
				columnHelper.display({
					id: "rowNumber",
					header: "#",
					cell: ({ row }) => row.getDisplayIndex() + 1,
				}),
				columnHelper.accessor("firstName", {
					cell: (info) => info.getValue(),
					header: "First name",
					// enableColumnFilter: false, // disable filtering for this column
				}),
				columnHelper.accessor((row) => row.lastName, {
					id: "lastName",
					cell: (info) => info.getValue(),
					header: () => <span>Last Name</span>,
				}),
				columnHelper.accessor((row) => `${row.firstName} ${row.lastName}`, {
					id: "fullName",
					header: "Full Name",
					cell: (info) => info.getValue(),
				}),
				columnHelper.accessor("age", {
					header: () => "Age",
					meta: {
						filterVariant: "range",
					},
				}),
				columnHelper.accessor("visits", {
					header: () => <span>Visits</span>,
					meta: {
						filterVariant: "range",
					},
				}),
				columnHelper.accessor("status", {
					header: "Status",
					filterFn: "equalsString", // filterFn string to pick from filterFns
					meta: {
						filterVariant: "select",
					},
				}),
				columnHelper.accessor("progress", {
					header: "Profile Progress",
					meta: {
						filterVariant: "range",
					},
					filterFn: filterFn_inNumberRange, // or just reference static filterFn from import
					// you could also write your own custom filter function here
				}),
				columnHelper.accessor("birthDate", {
					header: "Birth Date",
					// A locale-independent date format keeps the demo (and its tests) stable
					cell: (info) => info.getValue().toISOString().slice(0, 10),
					filterFn: "inDateRange", // accepts Date objects, timestamps, or parseable date strings
					meta: {
						filterVariant: "dateRange",
					},
				}),
			]),
		[],
	);

	const table = useTable(
		{
			features,
			columns,
			data,
			debugTable: true,
			debugColumns: true,
		},
		(state) => state,
	);

	return (
		<TableContainer>
			<Table>
				<TableHead>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => {
								return (
									<TableCell
										key={header.id}
										colSpan={header.colSpan}
										className={style.columnHeader}
									>
										{header.isPlaceholder ? null : (
											<>
												<div>
													<table.FlexRender header={header} />
												</div>
												{header.column.getCanFilter() ? (
													<div>
														<Filter column={header.column} />
													</div>
												) : null}
											</>
										)}
									</TableCell>
								);
							})}
						</TableRow>
					))}
				</TableHead>
				<TableBody>
					{table.getRowModel().rows.map((row) => {
						return (
							<TableRow key={row.id}>
								{row.getAllCells().map((cell) => {
									return (
										<TableCell key={cell.id}>
											<table.FlexRender cell={cell} />
										</TableCell>
									);
								})}
							</TableRow>
						);
					})}
				</TableBody>

				<TableFooter>
					<TableRow>
						<TablePagination
							rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
							labelRowsPerPage="Rows per page"
							colSpan={table.getAllLeafColumns().length}
							count={table.getPrePaginatedRowModel().rows.length}
							rowsPerPage={table.state.pagination.pageSize}
							page={table.state.pagination.pageIndex}
							slotProps={{
								select: {
									inputProps: {
										"aria-label": "rows per page",
									},
									native: true,
								},
							}}
							onPageChange={(_event, newPage) => table.setPageIndex(newPage)}
							onRowsPerPageChange={(event) => {
								const value = Number(event.target.value);
								table.setPageSize(
									value === -1
										? table.getPrePaginatedRowModel().rows.length
										: value,
								);
								table.setPageIndex(0);
							}}
							ActionsComponent={TablePaginationActions}
						/>
					</TableRow>
				</TableFooter>
			</Table>
		</TableContainer>
	);
}

function Filter({
	column,
}: {
	column: Column<typeof features, Person, unknown>;
}) {
	const columnFilterValue = column.getFilterValue();
	const { filterVariant } = column.columnDef.meta ?? {};

	return filterVariant === "dateRange" ? (
		<div>
			<div className="filter-row">
				<DebouncedInput
					type="date"
					aria-label={`${column.id} min`}
					value={(columnFilterValue as [string, string] | undefined)?.[0] ?? ""}
					onChange={(value) =>
						column.setFilterValue((old: [string, string] | undefined) => [
							value,
							old?.[1],
						])
					}
					className="filter-input"
				/>
				<DebouncedInput
					type="date"
					aria-label={`${column.id} max`}
					value={(columnFilterValue as [string, string] | undefined)?.[1] ?? ""}
					onChange={(value) =>
						column.setFilterValue((old: [string, string] | undefined) => [
							old?.[0],
							value,
						])
					}
					className="filter-input"
				/>
			</div>
			<div className="spacer-xs" />
		</div>
	) : filterVariant === "range" ? (
		<div>
			<div className="filter-row">
				{/* See faceted column filters example for min max values functionality */}
				<DebouncedInput
					type="number"
					value={(columnFilterValue as [number, number] | undefined)?.[0] ?? ""}
					onChange={(value) =>
						column.setFilterValue((old: [number, number] | undefined) => [
							value,
							old?.[1],
						])
					}
					placeholder={`Min`}
					className="filter-input"
				/>
				<DebouncedInput
					type="number"
					value={(columnFilterValue as [number, number] | undefined)?.[1] ?? ""}
					onChange={(value) =>
						column.setFilterValue((old: [number, number] | undefined) => [
							old?.[0],
							value,
						])
					}
					placeholder={`Max`}
					className="filter-input"
				/>
			</div>
			<div className="spacer-xs" />
		</div>
	) : filterVariant === "select" ? (
		<select
			onChange={(e) => column.setFilterValue(e.target.value)}
			value={columnFilterValue?.toString()}
		>
			{/* See faceted column filters example for dynamic select options */}
			<option value="">All</option>
			<option value="complicated">complicated</option>
			<option value="relationship">relationship</option>
			<option value="single">single</option>
		</select>
	) : (
		<DebouncedInput
			className="filter-select"
			onChange={(value) => column.setFilterValue(value)}
			placeholder={`Search...`}
			type="text"
			value={(columnFilterValue ?? "") as string}
		/>
		// See faceted column filters example for datalist search suggestions
	);
}

// A typical debounced input react component
function DebouncedInput({
	value: initialValue,
	onChange,
	debounce = 500,
	...props
}: {
	value: string | number;
	onChange: (value: string | number) => void;
	debounce?: number;
} & Omit<TextFieldProps, "onChange" | "value">) {
	const [value, setValue] = React.useState(initialValue);

	React.useEffect(() => {
		setValue(initialValue);
	}, [initialValue]);

	const debouncedOnChange = onChange;

	return (
		<TextField
			{...props}
			value={value ?? ""}
			onChange={(e) => {
				setValue(e.target.value);
				debouncedOnChange(e.target.value);
			}}
		/>
	);
}
