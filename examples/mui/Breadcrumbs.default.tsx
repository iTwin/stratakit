/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

export default () => {
	return (
		<Breadcrumbs aria-label="breadcrumb">
			<Link href="/">Home</Link>
			<Link href="#packages">Packages</Link>
			<Typography color="text.primary">@stratakit/mui</Typography>
		</Breadcrumbs>
	);
};
