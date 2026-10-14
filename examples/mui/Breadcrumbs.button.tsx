/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Breadcrumbs from "@mui/material/Breadcrumbs";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default () => {
	return (
		<Breadcrumbs aria-label="breadcrumb">
			<Button variant="text">Home</Button>
			<Button variant="text">Packages</Button>
			<Typography aria-current="true" color="textSecondary">
				@stratakit/mui
			</Typography>
		</Breadcrumbs>
	);
};
