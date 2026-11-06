/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import Stack from "@mui/material/Stack";
import TableDefault from "examples/mui/Table.default.tsx";
import TableFooter from "examples/mui/Table.footer.tsx";
import TableNumberAlignment from "examples/mui/Table.numberAlignment.tsx";
import TableSelect from "examples/mui/Table.select.tsx";
import TableSmall from "examples/mui/Table.small.tsx";
import TableSort from "examples/mui/Table.sort.tsx";

export default function TableExamples() {
	return (
		<Stack spacing={4} sx={{ alignItems: "start" }}>
			<TableDefault />
			<TableSmall />
			<TableSelect />
			<TableSort />
			<TableFooter />
			<TableNumberAlignment />
		</Stack>
	);
}
