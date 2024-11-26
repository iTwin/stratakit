/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Tabs } from "@itwin/kiwi-react/bricks";
import { useSearchParams } from "react-router";

export const handle = { title: "Tabs" };

export default function Page() {
	const [searchParams] = useSearchParams();
	const defaultSelectedId = searchParams.get("defaultSelectedId") || undefined;
	const visual = useSearchParams()[0].get("visual") === "true";
	const disabled = searchParams.get("disabled") === "true";

	if (visual) {
		return <VisualTest />;
	}

	return (
		<>
			<Tabs.Root defaultSelectedId={defaultSelectedId}>
				<Tabs.TabList>
					<Tabs.Tab id="tab1">Tab 1</Tabs.Tab>
					<Tabs.Tab id="tab2" disabled={disabled}>
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
}

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
