import Checkbox from "@mui/material/Checkbox";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useCreateAtom } from "@tanstack/react-store";
import {
	createColumnHelper,
	FlexRender,
	rowSelectionFeature,
	tableFeatures,
	useTable,
} from "@tanstack/react-table";
import { makeData } from "./makeData";

import type { RowSelectionState } from "@tanstack/react-table";
import type { Person } from "./makeData";

const features = tableFeatures({
	rowSelectionFeature,
});

const columnHelper = createColumnHelper<typeof features, Person>();

const data = makeData(12);

const columns = columnHelper.columns([
	columnHelper.display({
		id: "select",
		cell: ({ row }) => {
			const first = row.getValue("firstName");
			const last = row.getValue("lastName");
			return (
				<Checkbox
					checked={row.getIsSelected()}
					disabled={!row.getCanSelect()}
					onChange={row.getToggleSelectedHandler({})}
					slotProps={{
						input: { "aria-label": `Select ${first} ${last}` },
					}}
				/>
			);
		},
	}),
	columnHelper.accessor("firstName", {
		header: "First Name",
	}),
	columnHelper.accessor((row) => row.lastName, {
		id: "lastName",
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
]);

export default function App() {
	// optionally, raise the selection state to your own atom
	const rowSelectionAtom = useCreateAtom<RowSelectionState>({});

	const table = useTable({
		features,
		atoms: {
			rowSelection: rowSelectionAtom,
		},
		columns,
		data,
		getRowId: (row) => String(row.id),
		enableRowSelection: true,
	});

	const selectedRows = Object.keys(table.state.rowSelection).length;
	const totalRows = table.getRowModel().rows.length;
	const selectedRowText = `${selectedRows.toLocaleString()} of ${totalRows.toLocaleString()} rows selected`;

	return (
		<TableContainer>
			<Table aria-label="People">
				<TableHead>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => {
								return (
									<TableCell
										key={header.id}
										colSpan={header.colSpan}
										padding={header.id === "select" ? "checkbox" : "normal"}
									>
										<FlexRender header={header} />
									</TableCell>
								);
							})}
						</TableRow>
					))}
				</TableHead>
				<TableBody>
					{table.getRowModel().rows.map((row) => {
						return (
							<TableRow key={row.id} selected={row.getIsSelected()}>
								{row.getAllCells().map((cell) => {
									return (
										<TableCell
											key={cell.id}
											padding={
												cell.column.id === "select" ? "checkbox" : "normal"
											}
										>
											<FlexRender cell={cell} />
										</TableCell>
									);
								})}
							</TableRow>
						);
					})}
				</TableBody>
				<TableFooter>
					<TableRow>
						<TableCell colSpan={table.getAllColumns().length}>
							{selectedRowText}
						</TableCell>
					</TableRow>
				</TableFooter>
			</Table>
		</TableContainer>
	);
}
