/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import SwitchChecked from "examples/mui/Switch.checked.tsx";
import SwitchDefault from "examples/mui/Switch.default.tsx";
import SwitchIcon from "examples/mui/Switch.icon.tsx";
import SwitchSizes from "examples/mui/Switch.sizes.tsx";
import { createKnob } from "~/~utils.tsx";

export default function SwitchExamples() {
	return (
		<>
			<SwitchDefault />
			<SwitchChecked />
			<SwitchSizes />
			<SwitchIcon />
		</>
	);
}

export const knobs = {
	disabled: createKnob({
		props: {
			MuiFormControlLabel: {
				disabled: true,
			},
		},
	}),
};
