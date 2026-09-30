/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import BreadcrumbsButton from "examples/mui/Breadcrumbs.button.tsx";
import BreadcrumbsDefault from "examples/mui/Breadcrumbs.default.tsx";
import BreadcrumbsTruncation from "examples/mui/Breadcrumbs.truncation.tsx";

export default function BreadcrumbsExamples() {
	return (
		<>
			<BreadcrumbsDefault />
			<BreadcrumbsButton />
			<BreadcrumbsTruncation />
		</>
	);
}
