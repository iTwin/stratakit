/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Icon } from "@stratakit/foundations";
import { Tabs } from "@stratakit/structures";
import { definePage } from "~/~utils.tsx";

import placeholderIcon from "@stratakit/icons/placeholder.svg";

export const handle = { title: "Tabs" };

export default definePage(
	function Page({ defaultSelectedId, disabled }) {
		return (
			<Tabs.Root defaultSelectedId={defaultSelectedId}>
				<Tabs.TabList>
					<Tabs.Tab id="tab1">Tab 1</Tabs.Tab>
					<Tabs.Tab id="tab2" disabled={!!disabled}>
						Tab 2
					</Tabs.Tab>
					<Tabs.Tab id="tab3">Tab 3</Tabs.Tab>
				</Tabs.TabList>

				<Tabs.TabPanel tabId="tab1">Tab 1 content</Tabs.TabPanel>
				<Tabs.TabPanel tabId="tab2">Tab 2 content</Tabs.TabPanel>
				<Tabs.TabPanel tabId="tab3">Tab 3 content</Tabs.TabPanel>
			</Tabs.Root>
		);
	},
	{ visual: VisualTest },
);

function VisualTest() {
	const tones = ["neutral", "accent"] as const;

	return (
		<div style={{ display: "grid", gap: 4 }}>
			{tones.map((tone) => (
				<Tabs.Root key={tone}>
					<Tabs.TabList tone={tone}>
						<Tabs.Tab id="tab1">Tab 1</Tabs.Tab>
						<Tabs.Tab id="tab2">
							<Icon href={placeholderIcon} />
							Tab 2
						</Tabs.Tab>
						<Tabs.Tab id="tab3">
							Tab 3
							<Icon href={placeholderIcon} />
						</Tabs.Tab>
						<Tabs.Tab id="tab4">
							<Icon href={placeholderIcon} />
							Tab 4
							<Icon href={placeholderIcon} />
						</Tabs.Tab>
						<Tabs.Tab id="tab5" disabled>
							Tab 5
						</Tabs.Tab>
						<Tabs.Tab id="tab6">Tab 6</Tabs.Tab>
					</Tabs.TabList>

					<Tabs.TabPanel tabId="tab1">Tab 1 content</Tabs.TabPanel>
					<Tabs.TabPanel tabId="tab2">Tab 2 content</Tabs.TabPanel>
					<Tabs.TabPanel tabId="tab3">Tab 3 content</Tabs.TabPanel>
					<Tabs.TabPanel tabId="tab4">Tab 4 content</Tabs.TabPanel>
					<Tabs.TabPanel tabId="tab5">Tab 5 content</Tabs.TabPanel>
					<Tabs.TabPanel tabId="tab6">Tab 6 content</Tabs.TabPanel>
				</Tabs.Root>
			))}
		</div>
	);
}
