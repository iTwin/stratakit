/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import Stack from "@mui/material/Stack";
import ListAvatar from "examples/mui/List.avatar.tsx";
import ListDefault from "examples/mui/List.default.tsx";
import ListSubheader from "examples/mui/List.subheader.tsx";

export default function ListExamples() {
	return (
		<Stack spacing={2} sx={{ alignSelf: "stretch" }}>
			<ListDefault />
			<ListAvatar />
			<ListSubheader />
		</Stack>
	);
}
