/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import TabsDefault from "examples/mui/Tabs.default.tsx";
import TabsScrollable from "examples/mui/Tabs.scrollable.tsx";
import { createKnob } from "~/~utils.tsx";

export default function TabsExamples() {
	return (
		<>
			<TabsDefault />
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
