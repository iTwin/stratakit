/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import Stack from "@mui/material/Stack";
import LinkColors_ from "examples/mui/Link._colors.tsx";
import LinkDefault from "examples/mui/Link.default.tsx";
import LinkExternal from "examples/mui/Link.external.tsx";

export default function LinkExamples() {
	return (
		<Stack spacing={4} sx={{ alignItems: "start" }}>
			<LinkDefault />
			<LinkExternal />
			<LinkColors_ />
		</Stack>
	);
}
