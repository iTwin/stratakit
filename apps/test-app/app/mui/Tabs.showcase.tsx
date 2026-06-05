/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import TabsColors from "examples/mui/Tabs.colors.tsx";
import TabsDefault from "examples/mui/Tabs.default.tsx";
import TabsIcon from "examples/mui/Tabs.icon.tsx";
import TabsIconOnly from "examples/mui/Tabs.icon-only.tsx";
import TabsScrollable from "examples/mui/Tabs.scrollable.tsx";
import TabsSizes from "examples/mui/Tabs.sizes.tsx";
import { createKnob } from "~/~utils.tsx";

export default function TabsExamples() {
	return (
		<>
			<TabsDefault />
			<TabsSizes />
			<TabsColors />
			<TabsIcon />
			<TabsIconOnly />
			<TabsScrollable />
		</>
	);
}

export const knobs = {
	disabled: createKnob({
		props: {
			MuiTab: {
				disabled: true,
			},
		},
	}),
	fullWidth: createKnob({
		props: {
			MuiTabs: {
				variant: "fullWidth",
			},
		},
	}),
};
