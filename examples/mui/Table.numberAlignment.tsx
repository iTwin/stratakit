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

import styles from "./Table.numberAlignment.module.css";

export default () => {
	const rows = [
		{ name: "CPU utilization", value: 12.11231 },
		{ name: "Memory usage", value: 15360.85 },
		{ name: "Disk throughput", value: 248.15 },
		{ name: "Build duration", value: 11111.13456 },
		{ name: "Fan cycles", value: 90000 },
		{ name: "Request rate", value: 12045.01 },
		{ name: "Cache hit ratio", value: 96.97 },
		{ name: "π", value: Math.PI },
	];

	const formatter = new Intl.NumberFormat("en-US", {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	});

	return (
		<TableContainer render={<Paper />}>
			<Table>
				<caption style={visuallyHidden}>System metrics</caption>
				<TableHead>
					<TableRow>
						<TableCell>Name</TableCell>
						<TableCell>Default</TableCell>
						<TableCell align="right">Aligned</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row) => (
						<TableRow key={row.name}>
							<TableCell render={<th />} scope="row">
								{row.name}
							</TableCell>
							<TableCell>{row.value}</TableCell>
							<TableCell className={styles.numberColumn}>
								{formatter.format(row.value)}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};
