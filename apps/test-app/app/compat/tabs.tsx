/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Tabs } from "@stratakit/react";
import * as React from "react";
import { definePage } from "~/~utils.tsx";

export const handle = { title: "Text" };

export default definePage(function Page() {
	const [tabIndex, setTabIndex] = React.useState(0);
	return (
		<div style={{ display: "grid", gap: 4 }}>
			<Tabs labels={["Tab 1", "Tab 2"]} onTabSelected={setTabIndex}>
				Tabs content {tabIndex + 1}
			</Tabs>
		</div>
	);
});
