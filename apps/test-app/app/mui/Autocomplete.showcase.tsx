/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import AutocompleteDefault from "examples/mui/Autocomplete.default.tsx";
import AutocompleteMultiple from "examples/mui/Autocomplete.multiple.tsx";
import AutocompleteSizes from "examples/mui/Autocomplete.sizes.tsx";

export default function AutocompleteExamples() {
	return (
		<>
			<AutocompleteDefault />
			<AutocompleteSizes />
			<AutocompleteMultiple />
		</>
	);
}
