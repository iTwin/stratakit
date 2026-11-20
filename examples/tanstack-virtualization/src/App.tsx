import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
	columnSizingFeature,
	createColumnHelper,
	FlexRender,
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

import style from "./App.module.css";

const features = tableFeatures({
	columnSizingFeature,
});

const columnHelper = createColumnHelper<typeof features, Person>();

const data = makeData(5_000);

export default function App() {
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

	// Static layout styles live in the CSS module; only dynamic values (width, height, transform) are inline.
	return (
		<TableContainer ref={setTableContainer} className={style.tableContainer}>
			{/* Even though we're still using sematic table tags, we must use CSS grid and flexbox for dynamic row heights */}
			<Table
				className={style.table}
				aria-label="People"
				aria-rowcount={
					table.getRowModel().rows.length + table.getHeaderGroups().length
				}
			>
				<TableHead className={style.tableHeader}>
					{table.getHeaderGroups().map((headerGroup, index) => (
						<TableRow
							key={headerGroup.id}
							className={style.headerRow}
							aria-rowindex={index + 1}
						>
							{headerGroup.headers.map((header) => {
								return (
									<TableCell
										key={header.id}
										className={style.cell}
										style={{
											width: header.getSize(),
										}}
									>
										<FlexRender header={header} />
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
		estimateSize: () => 48, //estimate row height for accurate scrollbar dragging
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
			className={style.tableBody}
			style={{
				height: `${rowVirtualizer.getTotalSize()}px`, //tells scrollbar how big the table is
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
			className={style.virtualizedRow}
			style={{
				transform: `translateY(${virtualRow.start}px)`, //this should always be a `style` as it changes on scroll
			}}
			aria-rowindex={virtualRow.index + row.table.getHeaderGroups().length + 1}
		>
			{row.getAllCells().map((cell) => {
				return (
					<TableCell
						key={cell.id}
						className={style.cell}
						style={{
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
