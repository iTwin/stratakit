/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import Stack from "@mui/material/Stack";
import PopoverNested_ from "examples/mui/Popover._nested.tsx";
import PopoverDefault from "examples/mui/Popover.default.tsx";

export default function PopoverExamples() {
	return (
		<Stack spacing={4} sx={{ alignItems: "start" }}>
			<PopoverDefault />
			<PopoverNested_ />
		</Stack>
	);
}
