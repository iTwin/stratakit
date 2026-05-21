/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import Stack from "@mui/material/Stack";
import CircularProgressColors_ from "examples/mui/CircularProgress._colors.tsx";
import CircularProgressDefault from "examples/mui/CircularProgress.default.tsx";
import { isProduction } from "~/~utils.tsx";

export default function CircularProgressExamples() {
	return (
		<>
			<CircularProgressDefault />
			{!isProduction && (
				<Stack spacing={1} direction="row">
					<CircularProgressColors_ />
				</Stack>
			)}
		</>
	);
}
