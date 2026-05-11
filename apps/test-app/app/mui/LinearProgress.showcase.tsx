/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import Stack from "@mui/material/Stack";
import LinearProgressColors_ from "examples/mui/LinearProgress._colors.tsx";
import LinearProgressDefault from "examples/mui/LinearProgress.default.tsx";
import { isProduction } from "~/~utils.tsx";

export default function LinearProgressExamples() {
	return (
		<Stack spacing={1} sx={{ alignSelf: "stretch" }}>
			<LinearProgressDefault />
			{!isProduction && <LinearProgressColors_ />}
		</Stack>
	);
}
