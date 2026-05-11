/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import PaginationDefault from "examples/mui/Pagination.default.tsx";
import { createKnob } from "~/~utils.tsx";

export default function PaginationExamples() {
	return <PaginationDefault />;
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
