/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import ButtonGroupDefault from "examples/mui/ButtonGroup.default.tsx";
import ButtonGroupIcon from "examples/mui/ButtonGroup.icon.tsx";
import ButtonGroupSizes from "examples/mui/ButtonGroup.sizes.tsx";
import ButtonGroupSplit from "examples/mui/ButtonGroup.split.tsx";
import { createKnob } from "~/~utils.tsx";

export default function ButtonGroupExamples() {
	return (
		<>
			<ButtonGroupDefault />
			<ButtonGroupSizes />
			<ButtonGroupIcon />
			<ButtonGroupSplit />
		</>
	);
}

export const knobs = {
	disabled: createKnob({
		props: {
			MuiButtonGroup: {
				disabled: true,
			},
		},
	}),
};
