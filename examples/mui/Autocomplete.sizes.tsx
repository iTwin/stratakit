/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

export default () => {
	return (
		<Stack spacing={1}>
			<Autocomplete
				size="small"
				options={["Mouse", "Worm"]}
				renderInput={(params) => (
					<TextField {...params} label="Favorite small animal:" />
				)}
			/>

			<Autocomplete
				options={["Cat", "Dog"]}
				renderInput={(params) => (
					<TextField {...params} label="Favorite medium animal:" />
				)}
			/>
		</Stack>
	);
};
