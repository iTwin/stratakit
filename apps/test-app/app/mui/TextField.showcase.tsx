/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import Stack from "@mui/material/Stack";
import TextFieldColor from "examples/mui/TextField.color.tsx";
import TextFieldDefault from "examples/mui/TextField.default.tsx";
import TextFieldError from "examples/mui/TextField.error.tsx";
import TextFieldIcon from "examples/mui/TextField.icon.tsx";
import TextFieldMultiline from "examples/mui/TextField.multiline.tsx";
import TextFieldSizes from "examples/mui/TextField.sizes.tsx";
import { createKnob } from "~/~utils.tsx";

export default function TextFieldExamples() {
	return (
		<Stack spacing={2}>
			<TextFieldDefault />
			<TextFieldMultiline />
			<TextFieldIcon />
			<TextFieldError />
			<TextFieldSizes />
			<TextFieldColor />
		</Stack>
	);
}

export const knobs = {
	disabled: createKnob({
		props: {
			MuiTextField: {
				disabled: true,
			},
		},
	}),
};
