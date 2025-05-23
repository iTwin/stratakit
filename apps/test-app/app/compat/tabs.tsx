/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Tabs } from "@stratakit/react";
import * as React from "react";
import { definePage } from "~/~utils.tsx";

export const handle = { title: "Text" };

export default definePage(function Page() {
	return (
		<div style={{ display: "grid", gap: 12 }}>
			<div>
				<Tabs labels={["Tab 1", "Tab 2"]}>Tabs content</Tabs>
			</div>
			<ControlledActiveIndex />
			<div>
				<Tabs labels={["Tab 1", "Tab 2"]} focusActivationMode="manual">
					focusActivationMode="manual"
				</Tabs>
			</div>
		</div>
	);
});

function ControlledActiveIndex() {
	const [activeIndex, setActiveIndex] = React.useState(1);
	return (
		<div>
			<Tabs
				labels={["Tab 1", "Tab 2"]}
				activeIndex={activeIndex}
				onTabSelected={setActiveIndex}
			>
				Controlled tabs {activeIndex + 1}
			</Tabs>
		</div>
	);
}
