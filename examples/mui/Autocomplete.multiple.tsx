/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

import styles from "./Autocomplete.multiple.module.css";

export default () => {
	return (
		<Autocomplete
			className={styles.autocomplete}
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
				<TextField {...params} label="Choose favorite components:" />
			)}
			multiple
		/>
	);
};
