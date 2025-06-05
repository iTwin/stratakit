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
			<Tabs labels={["Tab 1", "Tab 2"]}>Content</Tabs>
			<Tabs labels={["Tab 1", "Tab 2"]} color="green">
				color="green"
			</Tabs>
			<Tabs labels={["Tab 1", "Tab 2"]} focusActivationMode="manual">
				focusActivationMode="manual"
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
			<Controlled />

			<Tabs
				labels={[
					<Tab key={1} label="Tab 1" />,
					<Tab key={2} label="Tab 2" disabled />,
					<Tab key={3} label="Tab 3" id="legacy-tab-3" />,
				]}
			>
				Legacy Tab
			</Tabs>
			<ControlledLegacyTab />

			<Compositional />
			<CompositionalGreen />
			<CompositionalManual />
			<CompositionalClassNames />
			<CompositionalDefaultValue />
			<CompositionalControlled />

			<Tabs.TabIcon />
			<Tabs.TabLabel />
			<Tabs.TabDescription />
			<Tabs.Actions />
		</div>
	);
});

function Controlled() {
	const [activeIndex, setActiveIndex] = React.useState(1);
	return (
		<Tabs
			labels={["Tab 1", "Tab 2"]}
			activeIndex={activeIndex}
			onTabSelected={(newIndex) => {
				console.log(`onTabSelected(${newIndex})`);
				setActiveIndex(newIndex);
			}}
		>
			Controlled {activeIndex + 1}
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
			onTabSelected={(newIndex) => {
				console.log(`onTabSelected(${newIndex})`);
				setActiveIndex(newIndex);
			}}
		>
			Controlled legacy Tab {activeIndex + 1}
		</Tabs>
	);
}

function Compositional() {
	return (
		<Tabs.Wrapper>
			<Tabs.TabList>
				<Tabs.Tab value="1">Tab 1</Tabs.Tab>
				<Tabs.Tab value="2" disabled>
					Tab 2
				</Tabs.Tab>
				<Tabs.Tab value="3">Tab 3</Tabs.Tab>
			</Tabs.TabList>
			<Tabs.Panel value="1">Compositional 1</Tabs.Panel>
			<Tabs.Panel value="2">Compositional 2</Tabs.Panel>
			<Tabs.Panel value="3">Compositional 3</Tabs.Panel>
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

function CompositionalManual() {
	return (
		<Tabs.Wrapper focusActivationMode="manual">
			<Tabs.TabList>
				<Tabs.Tab value="1">Tab 1</Tabs.Tab>
				<Tabs.Tab value="2">Tab 2</Tabs.Tab>
			</Tabs.TabList>
			<Tabs.Panel value="1">
				Compositional focusActivationMode="manual" 1
			</Tabs.Panel>
			<Tabs.Panel value="2">
				Compositional focusActivationMode="manual" 2
			</Tabs.Panel>
		</Tabs.Wrapper>
	);
}

function CompositionalClassNames() {
	return (
		<Tabs.Wrapper className="my-wrapper">
			<Tabs.TabList className="my-tab-list">
				<Tabs.Tab value="1" className="my-tab-1">
					Tab 1
				</Tabs.Tab>
				<Tabs.Tab value="2" className="my-tab-2">
					Tab 2
				</Tabs.Tab>
			</Tabs.TabList>
			<Tabs.Panel value="1" className="my-panel-1">
				Compositional classNames 1
			</Tabs.Panel>
			<Tabs.Panel value="2" className="my-panel-2">
				Compositional classNames 2
			</Tabs.Panel>
		</Tabs.Wrapper>
	);
}

function CompositionalDefaultValue() {
	return (
		<Tabs.Wrapper defaultValue="2">
			<Tabs.TabList>
				<Tabs.Tab value="1">Tab 1</Tabs.Tab>
				<Tabs.Tab value="2">Tab 2</Tabs.Tab>
			</Tabs.TabList>
			<Tabs.Panel value="1">Compositional defaultValue="2" 1</Tabs.Panel>
			<Tabs.Panel value="2">Compositional defaultValue="2" 2</Tabs.Panel>
		</Tabs.Wrapper>
	);
}

function CompositionalControlled() {
	const [value, setValue] = React.useState("2");
	return (
		<Tabs.Wrapper
			value={value}
			onValueChange={(newValue) => {
				console.log(`onValueChange(${newValue})`);
				setValue(newValue);
			}}
		>
			<Tabs.TabList>
				<Tabs.Tab value="1">Tab 1</Tabs.Tab>
				<Tabs.Tab value="2">Tab 2</Tabs.Tab>
			</Tabs.TabList>
			<Tabs.Panel value="1">Compositional controlled 1</Tabs.Panel>
			<Tabs.Panel value="2">Compositional controlled 2</Tabs.Panel>
		</Tabs.Wrapper>
	);
}
