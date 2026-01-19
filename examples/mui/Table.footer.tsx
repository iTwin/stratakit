/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TablePaginationActions from "@mui/material/TablePaginationActions";
import TableRow from "@mui/material/TableRow";

import styles from "./Table.default.module.css";

export default () => {
	return (
		<TableContainer component={Paper}>
			<Table className={styles.table} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell>Id</TableCell>
						<TableCell>Name</TableCell>
						<TableCell>Description</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{Array.from({ length: 4 }).map((_, index) => (
						<TableRow key={index}>
							<TableCell component="th" scope="row">
								{index}
							</TableCell>
							<TableCell>Name {index}</TableCell>
							<TableCell>Description {index}</TableCell>
						</TableRow>
					))}
				</TableBody>
				<TableFooter>
					<TableRow>
						<TablePagination
							rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
							colSpan={3}
							count={100}
							rowsPerPage={10}
							page={2}
							slotProps={{
								select: {
									inputProps: {
										"aria-label": "rows per page",
									},
									native: true,
								},
							}}
							onPageChange={() => {}}
							ActionsComponent={TablePaginationActions}
						/>
					</TableRow>
				</TableFooter>
			</Table>
		</TableContainer>
	);
};
