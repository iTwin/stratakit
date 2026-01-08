/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

export default () => {
	return (
		<Autocomplete
			options={[
				"Badge",
				"Button",
				"Checkbox",
				"Dialog",
				"Divider",
				"Progress",
				"Rating",
				"Select",
				"Switch",
				"TextField",
			]}
			renderInput={(params) => (
				<TextField {...params} label="Choose a favorite component:" />
			)}
			style={{ minInlineSize: 300 }}
		/>
	);
};
