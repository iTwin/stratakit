/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import TabsColors from "examples/mui/Tabs.colors.tsx";
import TabsDefault from "examples/mui/Tabs.default.tsx";
import TabsIcon from "examples/mui/Tabs.icon.tsx";
import TabsScrollable from "examples/mui/Tabs.scrollable.tsx";
import { createKnob } from "~/~utils.tsx";

export default function TabsExamples() {
	return (
		<>
			<TabsDefault />
			<TabsColors />
			<TabsIcon />
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
};
