/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

export default () => {
	return (
		<Alert>
			<AlertTitle>Success</AlertTitle>
			Here is a gentle confirmation that your action was successful.
		</Alert>
	);
};
