var e=`/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

export default () => {
	return (
		<Alert severity="error" role="alert">
			<AlertTitle>Invalid credit card</AlertTitle>
			Your bank has declined the charge to your card. Please check the card
			number or contact your bank.
		</Alert>
	);
};
`;export{e as default};