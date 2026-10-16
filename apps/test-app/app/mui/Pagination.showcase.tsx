/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import Stack from "@mui/material/Stack";
import PaginationDefault from "examples/mui/Pagination.default.tsx";
import { createKnob } from "~/~utils.tsx";

export default function PaginationExamples() {
	return (
		<Stack spacing={4} sx={{ alignItems: "start" }}>
			<PaginationDefault />
		</Stack>
	);
}

export const knobs = {
	disabled: createKnob({
		props: {
			MuiPagination: {
				disabled: true,
			},
		},
	}),
};
