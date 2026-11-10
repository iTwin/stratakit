/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import Stack from "@mui/material/Stack";
import SelectDefault from "examples/mui/Select.default.tsx";
import SelectIcon from "examples/mui/Select.icon.tsx";
import SelectMultiple from "examples/mui/Select.multiple.tsx";
import SelectSizes from "examples/mui/Select.sizes.tsx";
import SelectVariants from "examples/mui/Select.variants.tsx";
import { createKnob, DefaultPropsProvider } from "~/~utils.tsx";

import type { KnobProps } from "~/~utils.tsx";

export default function SelectExamples({ disabled }: KnobProps<typeof knobs>) {
	return (
		<DefaultPropsProvider value={{ MuiFormControl: { disabled } }}>
			<Stack spacing={4} sx={{ alignItems: "start" }}>
				<SelectDefault />
				<SelectVariants />
				<SelectIcon />
				<SelectMultiple />
				<SelectSizes />
			</Stack>
		</DefaultPropsProvider>
	);
}

export const knobs = {
	disabled: createKnob({ type: "boolean" }),
};
