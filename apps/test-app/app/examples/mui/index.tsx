/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { useLocation } from "react-router";

import type * as React from "react";

const modules = import.meta.glob("../../../../../examples/mui/*.tsx", {
	eager: true,
}) as Record<string, { default: React.FC }>;

export default function MuiExamplePage() {
	const { pathname } = useLocation();
	// pathname: /examples/mui/Button.default  →  fileName: "Button.default"
	const fileName = pathname.split("/").pop();

	const key = Object.keys(modules).find((k) => k.endsWith(`/${fileName}.tsx`));
	const Component = key ? modules[key].default : null;

	if (!Component) {
		return <p>Example not found: {fileName}</p>;
	}

	return <Component />;
}
