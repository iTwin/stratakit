/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";

export default () => {
	return (
		<Breadcrumbs aria-label="breadcrumb" separator="/">
			<Link href="/">Home</Link>
			<Link href="#packages">Packages</Link>
			<Link aria-current="true" color="textSecondary">
				@stratakit/mui
			</Link>
		</Breadcrumbs>
	);
};
