/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Tabs } from "@stratakit/react";
import * as React from "react";
import { definePage } from "~/~utils.tsx";

export const handle = { title: "Tabs" };

export default definePage(function Page() {
	return (
		<div style={{ display: "grid", gap: 16 }}>
			<Tabs labels={["Tab 1", "Tab 2"]}>Tabs content</Tabs>
			<ControlledActiveIndex />
			<Tabs labels={["Tab 1", "Tab 2"]} focusActivationMode="manual">
				focusActivationMode="manual"
			</Tabs>
			<Tabs labels={["Tab 1", "Tab 2"]} color="green">
				color="green"
			</Tabs>
			<Tabs
				labels={["Tab 1", "Tab 2"]}
				wrapperClassName="wrapperClassName" // this is overridden by className
				className="className"
				tabsClassName="tabsClassName"
				contentClassName="contentClassName"
			>
				classNames
			</Tabs>
		</div>
	);
});

function ControlledActiveIndex() {
	const [activeIndex, setActiveIndex] = React.useState(1);
	return (
		<Tabs
			labels={["Tab 1", "Tab 2"]}
			activeIndex={activeIndex}
			onTabSelected={setActiveIndex}
		>
			Controlled tabs {activeIndex + 1}
		</Tabs>
	);
}
