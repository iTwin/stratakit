/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import Stack from "@mui/material/Stack";
import AutocompleteDefault from "examples/mui/Autocomplete.default.tsx";
import AutocompleteMultiple from "examples/mui/Autocomplete.multiple.tsx";
import AutocompleteSizes from "examples/mui/Autocomplete.sizes.tsx";
import { createKnob, DefaultPropsProvider } from "~/~utils.tsx";

import type { KnobProps } from "~/~utils.tsx";

export default function AutocompleteExamples({
	disabled,
}: KnobProps<typeof knobs>) {
	return (
		<DefaultPropsProvider value={{ MuiAutocomplete: { disabled } }}>
			<Stack spacing={4} sx={{ alignItems: "start" }}>
				<AutocompleteDefault />
				<AutocompleteSizes />
				<AutocompleteMultiple />
			</Stack>
		</DefaultPropsProvider>
	);
}

export const knobs = {
	disabled: createKnob({ type: "boolean" }),
};
