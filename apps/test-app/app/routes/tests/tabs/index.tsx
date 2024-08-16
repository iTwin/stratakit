/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Tabs } from "@itwin/kiwi-react/bricks";
import { useSearchParams } from "@remix-run/react";

export default function Page() {
	const [searchParams] = useSearchParams();
	const defaultSelectedId = searchParams.get("defaultSelectedId") || undefined;
	const disabled = searchParams.get("disabled") === "true";

	return (
		<>
			<h1>Tabs</h1>

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
