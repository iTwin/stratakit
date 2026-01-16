import { Tabs } from "@stratakit/structures";
import * as React from "react";

export default () => {
	const tab1Id = React.useId();
	const tab2Id = React.useId();
	const tab3Id = React.useId();

	return (
		<Tabs.Provider defaultSelectedId={tab1Id}>
			<Tabs.TabList tone="accent">
				<Tabs.Tab id={tab1Id}>Posts</Tabs.Tab>
				<Tabs.Tab id={tab2Id}>About</Tabs.Tab>
				<Tabs.Tab id={tab3Id}>Friends</Tabs.Tab>
			</Tabs.TabList>

			<Tabs.TabPanel tabId={tab1Id}>Posts content.</Tabs.TabPanel>
			<Tabs.TabPanel tabId={tab2Id}>About content.</Tabs.TabPanel>
			<Tabs.TabPanel tabId={tab3Id}>Friends content.</Tabs.TabPanel>
		</Tabs.Provider>
	);
};
