/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import visuallyHidden from "@mui/utils/visuallyHidden";

import styles from "./Table.default.module.css";

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
			<Table className={styles.table}>
				<caption style={visuallyHidden}>Dessert nutrition</caption>
				<TableHead>
					<TableRow>
						<TableCell>Dessert (100g serving)</TableCell>
						<TableCell align="right">Calories</TableCell>
						<TableCell align="right">Fat&nbsp;(g)</TableCell>
						<TableCell align="right">Carbs&nbsp;(g)</TableCell>
						<TableCell align="right">Protein&nbsp;(g)</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row) => (
						<TableRow key={row.name}>
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
