/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import visuallyHidden from "@mui/utils/visuallyHidden";

import styles from "./Table.default.module.css";

interface RowData {
	id: number;
	name: string;
	calories: number;
}

export default () => {
	const rows: RowData[] = [
		{ id: 1, name: "Cupcake", calories: 305 },
		{ id: 2, name: "Eclair", calories: 262 },
		{ id: 3, name: "Frozen yoghurt", calories: 159 },
		{ id: 4, name: "Gingerbread", calories: 356 },
		{ id: 5, name: "Ice cream sandwich", calories: 237 },
	];

	const [selected, setSelected] = React.useState<number[]>([]);
	const idPrefix = React.useId();

	const handleClick = (id: number) => {
		const selectedIndex = selected.indexOf(id);
		let newSelected: number[] = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, id);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1),
			);
		}
		setSelected(newSelected);
	};

	const isSelected = (id: number) => selected.indexOf(id) !== -1;

	const numSelected = selected.length;
	const rowCount = rows.length;

	return (
		<TableContainer render={<Paper />}>
			<Table className={styles.table}>
				<caption style={visuallyHidden}>
					Selectable dessert nutrition table, {numSelected} of {rowCount} rows
					selected
				</caption>
				<TableHead>
					<TableRow>
						<TableCell padding="checkbox" />
						<TableCell>Dessert (100g serving)</TableCell>
						<TableCell align="right">Calories</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row) => {
						const isItemSelected = isSelected(row.id);
						const labelId = `${idPrefix}-row-label-${row.id}`;

						return (
							<TableRow
								key={row.id}
								onClick={() => handleClick(row.id)}
								selected={isItemSelected}
							>
								<TableCell padding="checkbox">
									<Checkbox
										color="primary"
										checked={isItemSelected}
										slotProps={{ input: { "aria-labelledby": labelId } }}
									/>
								</TableCell>
								<TableCell id={labelId}>{row.name}</TableCell>
								<TableCell align="right">{row.calories}</TableCell>
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		</TableContainer>
	);
};
