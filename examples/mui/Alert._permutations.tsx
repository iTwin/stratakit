/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import Alert from "@mui/material/Alert";

export default () => {
	return (["outlined", "filled"] as const).map((variant) => (
		<React.Fragment key={variant}>
			<Alert severity="success" variant={variant}>
				This is a success Alert.
			</Alert>
			<Alert severity="info" variant={variant}>
				This is an info Alert.
			</Alert>
			<Alert severity="warning" variant={variant}>
				This is a warning Alert.
			</Alert>
			<Alert severity="error" variant={variant}>
				This is an error Alert.
			</Alert>
		</React.Fragment>
	));
};
