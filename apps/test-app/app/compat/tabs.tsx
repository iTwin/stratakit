/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Tab, Tabs } from "@stratakit/react";
import * as React from "react";
import { definePage } from "~/~utils.tsx";

export const handle = { title: "Tabs" };

export default definePage(function Page() {
	return (
		<div style={{ display: "grid", gap: 16 }}>
			<Tabs labels={["Tab 1", "Tab 2"]}>Tabs content</Tabs>
			<Controlled />
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
			<Tabs
				labels={[
					<Tab key={1} label="Tab 1" />,
					<Tab key={2} label="Tab 2" disabled />,
					<Tab key={3} label="Tab3" id="legacy-tab-3" />,
				]}
			>
				Using legacy Tab component
			</Tabs>
			<ControlledLegacyTab />
			<Compositional />
			<CompositionalGreen />
		</div>
	);
});

function Controlled() {
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

function ControlledLegacyTab() {
	const [activeIndex, setActiveIndex] = React.useState(1);
	return (
		<Tabs
			labels={[
				<Tab key={1} label="Tab 1" />,
				<Tab key={2} label="Tab 2" id="controlled-legacy-tab-2" />,
			]}
			activeIndex={activeIndex}
			onTabSelected={setActiveIndex}
		>
			Controlled tabs using legacy Tab component {activeIndex + 1}
		</Tabs>
	);
}

function Compositional() {
	return (
		<Tabs.Wrapper>
			<Tabs.TabList>
				<Tabs.Tab value="1">Tab 1</Tabs.Tab>
				<Tabs.Tab value="2">Tab 2</Tabs.Tab>
			</Tabs.TabList>
			<Tabs.Panel value="1">Compositional tabs 1</Tabs.Panel>
			<Tabs.Panel value="2">Compositional tabs 2</Tabs.Panel>
		</Tabs.Wrapper>
	);
}

function CompositionalGreen() {
	return (
		<Tabs.Wrapper color="green">
			<Tabs.TabList>
				<Tabs.Tab value="1">Tab 1</Tabs.Tab>
				<Tabs.Tab value="2">Tab 2</Tabs.Tab>
			</Tabs.TabList>
			<Tabs.Panel value="1">Compositional color="green" 1</Tabs.Panel>
			<Tabs.Panel value="2">Compositional color="green" 2</Tabs.Panel>
		</Tabs.Wrapper>
	);
}
