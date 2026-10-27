/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import Stack from "@mui/material/Stack";
import TextFieldDefault from "examples/mui/TextField.default.tsx";
import TextFieldError from "examples/mui/TextField.error.tsx";
import TextFieldIcon from "examples/mui/TextField.icon.tsx";
import TextFieldMultiline from "examples/mui/TextField.multiline.tsx";
import TextFieldSearch from "examples/mui/TextField.search.tsx";
import TextFieldSizes from "examples/mui/TextField.sizes.tsx";
import { createKnob, DefaultPropsProvider } from "~/~utils.tsx";

import type { KnobProps } from "~/~utils.tsx";

export default function TextFieldExamples({
	disabled,
}: KnobProps<typeof knobs>) {
	return (
		<DefaultPropsProvider value={{ MuiTextField: { disabled } }}>
			<Stack spacing={2}>
				<TextFieldDefault />
				<TextFieldMultiline />
				<TextFieldIcon />
				<TextFieldError />
				<TextFieldSizes />
				<TextFieldSearch />
			</Stack>
		</DefaultPropsProvider>
	);
}

export const knobs = {
	disabled: createKnob({ type: "boolean" }),
};
