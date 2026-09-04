/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Breadcrumbs from "@mui/material/Breadcrumbs";
import Button from "@mui/material/Button";

export default () => {
	return (
		<Breadcrumbs aria-label="breadcrumb">
			<Button variant="text">Home</Button>
			<Button variant="text">Packages</Button>
			<Button variant="text" aria-current="true">
				@stratakit/mui
			</Button>
		</Breadcrumbs>
	);
};
