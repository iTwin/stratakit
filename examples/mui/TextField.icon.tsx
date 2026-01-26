/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { InputAdornment } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Icon } from "@stratakit/mui";

import svgPlaceholder from "@stratakit/icons/placeholder.svg";

export default () => {
	return (
		<TextField
			helperText="Description"
			error
			label="Name"
			slotProps={{
				input: {
					startAdornment: (
						<InputAdornment position="start">
							<Icon href={svgPlaceholder} />
						</InputAdornment>
					),
				},
			}}
		/>
	);
};
