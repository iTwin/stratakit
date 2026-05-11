/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import Stack from "@mui/material/Stack";
import AlertPermutations_ from "examples/mui/Alert._permutations.tsx";
import AlertDefault from "examples/mui/Alert.default.tsx";
import AlertTitle from "examples/mui/Alert.title.tsx";
import { isProduction } from "../~utils.tsx";

export default function AlertExamples() {
	return (
		<Stack spacing={1} sx={{ alignSelf: "stretch" }}>
			<AlertDefault />
			<AlertTitle />
			{!isProduction && <AlertPermutations_ />}
		</Stack>
	);
}
