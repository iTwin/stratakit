/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import Stack from "@mui/material/Stack";
import PaperDefault from "examples/mui/Paper.default.tsx";
import PaperOutlined from "examples/mui/Paper.outlined.tsx";

export default function PaperExamples() {
	return (
		<Stack spacing={4} sx={{ alignItems: "start" }}>
			<PaperDefault />
			<PaperOutlined />
		</Stack>
	);
}
