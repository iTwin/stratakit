var e=`/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

export default () => {
	return (
		<Alert severity="info">
			<AlertTitle>Connect billing required</AlertTitle>
			An organization administrator must connect a billing account if you want
			to continue using this feature.
		</Alert>
	);
};
`;export{e as default};