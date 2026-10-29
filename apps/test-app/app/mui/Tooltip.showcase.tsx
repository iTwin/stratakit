/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import Stack from "@mui/material/Stack";
import TooltipDefault from "examples/mui/Tooltip.default.tsx";
import TooltipDirection from "examples/mui/Tooltip.direction.tsx";

export default function TooltipExamples() {
	return (
		<Stack spacing={4} sx={{ alignItems: "start" }}>
			<TooltipDefault />
			<TooltipDirection />
		</Stack>
	);
}
