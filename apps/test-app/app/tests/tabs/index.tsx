/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Tabs } from "@itwin/itwinui-react/bricks";
import { definePage } from "~/~utils.tsx";

export const handle = { title: "Tabs" };

export default definePage(
	function Page({ defaultSelectedId, disabled }) {
		return (
			<>
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
			</>
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
						<Tabs.Tab id="tab2" disabled>
							Tab 2
						</Tabs.Tab>
						<Tabs.Tab id="tab3">Tab 3</Tabs.Tab>
					</Tabs.TabList>

					<Tabs.TabPanel tabId="tab1">Tab 1 content</Tabs.TabPanel>
					<Tabs.TabPanel tabId="tab2">Tab 2 content</Tabs.TabPanel>
					<Tabs.TabPanel tabId="tab3">Tab 3 content</Tabs.TabPanel>
				</Tabs.Root>
			))}
		</div>
	);
}
