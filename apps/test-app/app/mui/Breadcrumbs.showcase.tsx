/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import Stack from "@mui/material/Stack";
import BreadcrumbsButton from "examples/mui/Breadcrumbs.button.tsx";
import BreadcrumbsDefault from "examples/mui/Breadcrumbs.default.tsx";
import BreadcrumbsTruncation from "examples/mui/Breadcrumbs.truncation.tsx";

export default function BreadcrumbsExamples() {
	return (
		<Stack spacing={4} sx={{ alignItems: "start" }}>
			<BreadcrumbsDefault />
			<BreadcrumbsButton />
			<BreadcrumbsTruncation />
		</Stack>
	);
}
