/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Tabs } from "@stratakit/react";
import { definePage } from "~/~utils.tsx";

export const handle = { title: "Text" };

export default definePage(function Page() {
	return (
		<div style={{ display: "grid", gap: 4 }}>
			<Tabs labels={["Tab 1", "Tab 2"]}>Tabs with string labels</Tabs>
		</div>
	);
});
