/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Checkbox from "@mui/material/Checkbox";
import Stack from "@mui/material/Stack";
import CheckboxChecked from "examples/mui/Checkbox.checked.tsx";
import CheckboxDefault from "examples/mui/Checkbox.default.tsx";
import CheckboxError from "examples/mui/Checkbox.error.tsx";
import CheckboxGroup from "examples/mui/Checkbox.group.tsx";
import CheckboxIndeterminate from "examples/mui/Checkbox.indeterminate.tsx";
import { createKnob } from "~/~utils.tsx";
import { ScreenShotWrapper } from "~/ScreenShotWrapper.tsx";

export default function CheckboxExamples() {
	return (
		<>
			<CheckboxDefault />
			<CheckboxChecked />
			<CheckboxIndeterminate />
			<CheckboxGroup />
			<CheckboxError />
		</>
	);
}
export function VisualTest() {
	return (
		<ScreenShotWrapper>
			<Stack direction="row" spacing={2}>
				<Checkbox />
				<Checkbox indeterminate />
				<Checkbox checked />
				<Checkbox disabled />
				<Checkbox indeterminate disabled />
				<Checkbox checked disabled />
			</Stack>
		</ScreenShotWrapper>
	);
}

export const knobs = {
	disabled: createKnob({
		props: {
			MuiFormControl: {
				disabled: true,
			},
			MuiFormControlLabel: {
				disabled: true,
			},
		},
	}),
};
