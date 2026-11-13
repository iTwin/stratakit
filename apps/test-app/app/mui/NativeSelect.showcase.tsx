/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import Stack from "@mui/material/Stack";
import NativeSelectDefault from "examples/mui/NativeSelect.default.tsx";
import NativeSelectVariants from "examples/mui/NativeSelect.variants.tsx";

export default function NativeSelectExamples() {
	return (
		<Stack spacing={4} sx={{ alignItems: "start" }}>
			<NativeSelectDefault />
			<NativeSelectVariants />
		</Stack>
	);
}
