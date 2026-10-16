/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import Stack from "@mui/material/Stack";
import ButtonGroupDefault from "examples/mui/ButtonGroup.default.tsx";
import ButtonGroupSizes from "examples/mui/ButtonGroup.sizes.tsx";
import { createKnob } from "~/~utils.tsx";

export default function ButtonGroupExamples() {
	return (
		<Stack spacing={4} sx={{ alignItems: "start" }}>
			<ButtonGroupDefault />
			<ButtonGroupSizes />
		</Stack>
	);
}

export const knobs = {
	disabled: createKnob({
		props: {
			MuiButtonGroup: {
				disabled: true,
			},
		},
	}),
};
