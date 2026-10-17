/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import Stack from "@mui/material/Stack";
import SwitchChecked from "examples/mui/Switch.checked.tsx";
import SwitchDefault from "examples/mui/Switch.default.tsx";
import SwitchSizes from "examples/mui/Switch.sizes.tsx";
import { createKnob, DefaultPropsProvider } from "~/~utils.tsx";

import type { KnobProps } from "~/~utils.tsx";

export default function SwitchExamples({
	disabled,
	labelPlacement,
}: KnobProps<typeof knobs>) {
	return (
		<DefaultPropsProvider
			value={{
				MuiFormControlLabel: {
					disabled,
					...(labelPlacement && { labelPlacement }),
				},
			}}
		>
			<Stack spacing={4} sx={{ alignItems: "start" }}>
				<SwitchDefault />
				<SwitchChecked />
				<SwitchSizes />
			</Stack>
		</DefaultPropsProvider>
	);
}

export const knobs = {
	disabled: createKnob({ type: "boolean" }),
	labelPlacement: createKnob({
		type: "select",
		options: ["start", "end", "top", "bottom"],
	}),
};
