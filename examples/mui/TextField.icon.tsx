/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { svgEmailAt } from "@stratakit/icons/email-at";
import { Icon } from "@stratakit/mui";

export default () => {
	return (
		<TextField
			label="Username"
			slotProps={{
				input: {
					startAdornment: (
						<InputAdornment position="start">
							<Icon href={svgEmailAt} />
						</InputAdornment>
					),
				},
			}}
		/>
	);
};
