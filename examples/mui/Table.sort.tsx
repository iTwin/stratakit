/*---------------------------------------------------------------------------------------------
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

export default () => {
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

	const [direction, setDirection] =
		React.useState<React.ComponentProps<typeof TableSortLabel>["direction"]>(
			"asc",
		);

	const changeSortDirection = React.useCallback(() => {
		setDirection((current) => (current === "asc" ? "desc" : "asc"));
	}, []);

	const sortedRows = React.useMemo(
		() =>
			Array.from(rows).sort((a, b) =>
				direction === "asc" ? a.calories - b.calories : b.calories - a.calories,
			),
		[direction],
	);

	return (
		<TableContainer render={<Paper />}>
			<Table>
				<caption>Dessert nutrition sorted</caption>
				<TableHead>
					<TableRow>
						<TableCell>Dessert (100g serving)</TableCell>
						<TableCell align="right">
							Calories{" "}
							<TableSortLabel
								direction={direction}
								active={true}
								onClick={changeSortDirection}
							/>
						</TableCell>
						<TableCell align="right">Fat&nbsp;(g)</TableCell>
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
