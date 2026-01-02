/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TableSortLabel,
} from "@mui/material";

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

	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell sortDirection="asc">
							<TableSortLabel active direction="asc">
								Dessert (100g serving)
							</TableSortLabel>
						</TableCell>
						<TableCell align="right">Calories</TableCell>
						<TableCell align="right">Fat&nbsp;(g)</TableCell>
						<TableCell align="right">Carbs&nbsp;(g)</TableCell>
						<TableCell align="right">Protein&nbsp;(g)</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row) => (
						<TableRow
							key={row.name}
							sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
						>
							<TableCell component="th" scope="row">
								{row.name}
							</TableCell>
							<TableCell align="right">{row.calories}</TableCell>
							<TableCell align="right">{row.fat}</TableCell>
							<TableCell align="right">{row.carbs}</TableCell>
							<TableCell align="right">{row.protein}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};
