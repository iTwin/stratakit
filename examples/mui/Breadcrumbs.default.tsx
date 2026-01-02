/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Breadcrumbs, Link, Typography } from "@mui/material";

export default () => {
	return (
		<Breadcrumbs aria-label="breadcrumb">
			<Link href="/">Home</Link>
			<Link href="#packages">Packages</Link>
			<Typography color="text.primary">@stratakit/mui</Typography>
		</Breadcrumbs>
	);
};
