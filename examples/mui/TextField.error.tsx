/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import TextField from "@mui/material/TextField";
import { visuallyHidden } from "@mui/utils";

export default () => {
	return (
		<TextField
			label="Email"
			error
			helperText={
				<>
					<span style={visuallyHidden}>Error:</span> Invalid email address
				</>
			}
		/>
	);
};
