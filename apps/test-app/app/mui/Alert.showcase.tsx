/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import Stack from "@mui/material/Stack";
import AlertPermutations_ from "examples/mui/Alert._permutations.tsx";
import AlertRole from "examples/mui/Alert._role.tsx";
import AlertClose from "examples/mui/Alert.close.tsx";
import AlertDefault from "examples/mui/Alert.default.tsx";
import { isProduction } from "~/~utils.tsx";

export default function AlertExamples() {
	return (
		<Stack spacing={2} sx={{ alignSelf: "stretch" }}>
			<AlertDefault />
			<AlertClose />
			{!isProduction && <AlertPermutations_ />}
			{!isProduction && <AlertRole />}
		</Stack>
	);
}
