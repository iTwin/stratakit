var e=`/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";

const rows = [
	{ name: "Cupcake", calories: 305, fat: 3.7, carbs: 67, protein: 4.3 },
	{ name: "Eclair", calories: 262, fat: 16.0, carbs: 24, protein: 6.0 },
	{
		name: "Frozen yoghurt",
		calories: 159,
		fat: 6.0,
		carbs: 24,
		protein: 4.0,
	},
	{ name: "Gingerbread", calories: 356, fat: 16.0, carbs: 49, protein: 3.9 },
	{
		name: "Ice cream sandwich",
		calories: 237,
		fat: 9.0,
		carbs: 37,
		protein: 4.3,
	},
];

export default () => {
	const sortButtonDescriptionId = React.useId();

	const [direction, setDirection] =
		React.useState<React.ComponentProps<typeof TableSortLabel>["direction"]>(
			"asc",
		);
	const [sortedColumn, setSortedColumn] = React.useState<"calories" | "fat">(
		"calories",
	);

	const updateSort = (column: "calories" | "fat") => {
		if (column === sortedColumn) {
			setDirection((current) => (current === "asc" ? "desc" : "asc"));
		} else {
			setSortedColumn(column);
			setDirection("asc");
		}
	};

	const sortedRows = React.useMemo(
		() =>
			Array.from(rows).sort((a, b) =>
				direction === "asc"
					? a[sortedColumn] - b[sortedColumn]
					: b[sortedColumn] - a[sortedColumn],
			),
		[direction, sortedColumn],
	);

	return (
		<TableContainer render={<Paper />}>
			<span hidden id={sortButtonDescriptionId}>
				change sort
			</span>
			<Table>
				<caption>Dessert nutrition</caption>
				<TableHead>
					<TableRow>
						<TableCell>Dessert (100g serving)</TableCell>
						<TableCell
							align="right"
							sortDirection={sortedColumn === "calories" && direction}
						>
							<TableSortLabel
								direction={sortedColumn === "calories" ? direction : "asc"}
								active={sortedColumn === "calories"}
								onClick={() => updateSort("calories")}
								aria-describedby={sortButtonDescriptionId}
							>
								Calories
							</TableSortLabel>
						</TableCell>
						<TableCell
							align="right"
							sortDirection={sortedColumn === "fat" && direction}
						>
							<TableSortLabel
								direction={sortedColumn === "fat" ? direction : "asc"}
								active={sortedColumn === "fat"}
								onClick={() => updateSort("fat")}
								aria-describedby={sortButtonDescriptionId}
							>
								Fat&nbsp;(g)
							</TableSortLabel>
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{sortedRows.map((row) => (
						<TableRow key={row.name}>
							<TableCell render={<th />} scope="row">
								{row.name}
							</TableCell>
							<TableCell align="right">{row.calories}</TableCell>
							<TableCell align="right">{row.fat}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};
`;export{e as default};