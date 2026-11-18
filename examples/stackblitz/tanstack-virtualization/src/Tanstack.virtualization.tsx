/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from "react";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import {
	columnSizingFeature,
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
import {
	useVirtualizer,
	type VirtualItem,
	type Virtualizer,
} from "@tanstack/react-virtual";
import { makeData } from "./makeData";

import type { ReactTable, Row } from "@tanstack/react-table";
import type { Person } from "./makeData";

const features = tableFeatures({
	columnSizingFeature,
	rowSortingFeature,
	sortedRowModel: createSortedRowModel(),
	// Register the built-in sorting functions used by the "auto" sortFn resolution
	sortFns: {
		alphanumeric: sortFn_alphanumeric,
		basic: sortFn_basic,
		datetime: sortFn_datetime,
		text: sortFn_text,
	},
});

const columnHelper = createColumnHelper<typeof features, Person>();

const data = makeData(50_000);

//This is a dynamic row height example, which is more complicated, but allows for a more realistic table.
//See https://tanstack.com/virtual/v3/docs/examples/react/table for a simpler fixed row height example.
export default function TanstackVirtualization() {
	const columns = React.useMemo(
		() =>
			columnHelper.columns([
				columnHelper.accessor("id", {
					header: "ID",
					size: 80,
				}),
				columnHelper.accessor("firstName", {
					header: "First Name",
					cell: (info) => info.getValue(),
				}),
				columnHelper.accessor((row) => row.lastName, {
					id: "lastName",
					cell: (info) => info.getValue(),
					header: () => <span>Last Name</span>,
				}),
				columnHelper.accessor("age", {
					header: () => "Age",
					size: 80,
				}),
				columnHelper.accessor("visits", {
					header: () => <span>Visits</span>,
					size: 100,
				}),
				columnHelper.accessor("status", {
					header: "Status",
					size: 140,
				}),
				columnHelper.accessor("progress", {
					header: "Profile Progress",
					size: 170,
				}),
				columnHelper.accessor("birthDate", {
					header: "Birth Date",
					// A locale-independent date format keeps the demo (and its tests) stable
					cell: (info) => info.getValue().toISOString().slice(0, 10),
					size: 150,
				}),
			]),
		[],
	);

	// The virtualizer will need a reference to the scrollable container element.
	// Held in state (not a ref) so the virtualizer re-attaches once the element mounts.
	const [tableContainer, setTableContainer] =
		React.useState<HTMLDivElement | null>(null);

	const table = useTable({
		features,
		columns,
		data,
		debugTable: true,
	});

	// All important CSS styles are included as inline styles for this example. This is not recommended for your code.
	return (
		<TableContainer
			ref={setTableContainer}
			sx={{
				overflow: "auto", //our scrollable table container
				position: "relative", //needed for sticky header
				height: "800px", //should be a fixed height
			}}
		>
			{/* Even though we're still using sematic table tags, we must use CSS grid and flexbox for dynamic row heights */}
			<Table sx={{ display: "grid" }}>
				<TableHead
					sx={{
						display: "grid",
						position: "sticky",
						top: 0,
						zIndex: 1,
						bgcolor: "background.paper", //so scrolled rows don't show through
					}}
				>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow
							key={headerGroup.id}
							sx={{ display: "flex", width: "100%" }}
						>
							{headerGroup.headers.map((header) => {
								const sortDirection = header.column.getIsSorted();
								return (
									<TableCell
										key={header.id}
										sx={{
											display: "flex",
											width: header.getSize(),
										}}
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
				<VirtualizedTableBody table={table} scrollElement={tableContainer} />
			</Table>
		</TableContainer>
	);
}

interface VirtualizedTableBodyProps {
	table: ReactTable<typeof features, Person>;
	scrollElement: HTMLDivElement | null;
}

function VirtualizedTableBody({
	table,
	scrollElement,
}: VirtualizedTableBodyProps) {
	const { rows } = table.getRowModel();

	// Important: Keep the row virtualizer in the lowest component possible to avoid unnecessary re-renders.
	const rowVirtualizer = useVirtualizer<HTMLDivElement, HTMLTableRowElement>({
		count: rows.length,
		estimateSize: () => 33, //estimate row height for accurate scrollbar dragging
		getScrollElement: () => scrollElement,
		//measure dynamic row height, except in firefox because it measures table border height incorrectly
		measureElement:
			typeof window !== "undefined" &&
			navigator.userAgent.indexOf("Firefox") === -1
				? (element) => element?.getBoundingClientRect().height
				: undefined,
		overscan: 5,
	});

	return (
		<TableBody
			sx={{
				display: "grid",
				height: `${rowVirtualizer.getTotalSize()}px`, //tells scrollbar how big the table is
				position: "relative", //needed for absolute positioning of rows
			}}
		>
			{rowVirtualizer.getVirtualItems().map((virtualRow) => {
				const row = rows[virtualRow.index];
				return (
					<VirtualizedTableRow
						key={row.id}
						row={row}
						virtualRow={virtualRow}
						rowVirtualizer={rowVirtualizer}
					/>
				);
			})}
		</TableBody>
	);
}

interface VirtualizedTableRowProps {
	row: Row<typeof features, Person>;
	virtualRow: VirtualItem;
	rowVirtualizer: Virtualizer<HTMLDivElement, HTMLTableRowElement>;
}

function VirtualizedTableRow({
	row,
	virtualRow,
	rowVirtualizer,
}: VirtualizedTableRowProps) {
	return (
		<TableRow
			data-index={virtualRow.index} //needed for dynamic row height measurement
			ref={(node: HTMLTableRowElement | null) =>
				rowVirtualizer.measureElement(node)
			} //measure dynamic row height
			style={{
				display: "flex",
				position: "absolute",
				transform: `translateY(${virtualRow.start}px)`, //this should always be a `style` as it changes on scroll
				width: "100%",
			}}
		>
			{row.getAllCells().map((cell) => {
				return (
					<TableCell
						key={cell.id}
						sx={{
							display: "flex",
							width: cell.column.getSize(),
						}}
					>
						<FlexRender cell={cell} />
					</TableCell>
				);
			})}
		</TableRow>
	);
}
