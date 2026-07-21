/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import Stack from "@mui/material/Stack";
import DividerDefault from "examples/mui/Divider.default.tsx";
import DividerMargin from "examples/mui/Divider.margin.tsx";
import DividerPresentational from "examples/mui/Divider.presentational.tsx";
import DividerVariant from "examples/mui/Divider.variant.tsx";
import DividerVertical from "examples/mui/Divider.vertical.tsx";

export default function DividerExamples() {
	return (
		<>
			<Stack sx={{ alignSelf: "stretch" }}>
				<DividerDefault />
			</Stack>
			<DividerVertical />
			<DividerPresentational />
			<DividerMargin />
			<DividerVariant />
		</>
	);
}
