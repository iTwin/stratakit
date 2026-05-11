/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import Stack from "@mui/material/Stack";
import IconButtonColors_ from "examples/mui/IconButton._colors.tsx";
import IconButtonPlacements_ from "examples/mui/IconButton._placements.tsx";
import IconButtonDefault from "examples/mui/IconButton.default.tsx";
import IconButtonSizes from "examples/mui/IconButton.sizes.tsx";
import { isProduction } from "../~utils.tsx";

export default function IconButtonExamples() {
	return (
		<>
			<IconButtonDefault />
			<IconButtonSizes />
			{!isProduction && (
				<Stack spacing={1} direction="row">
					<IconButtonColors_ />
				</Stack>
			)}
			{!isProduction && (
				<Stack spacing={1} direction="row">
					<IconButtonPlacements_ />
				</Stack>
			)}
		</>
	);
}
