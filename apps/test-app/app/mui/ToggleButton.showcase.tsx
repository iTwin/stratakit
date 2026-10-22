/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import Stack from "@mui/material/Stack";
import ToggleButtonPlacements_ from "examples/mui/ToggleButton._placements.tsx";
import ToggleButtonDefault from "examples/mui/ToggleButton.default.tsx";
import ToggleButtonSizes from "examples/mui/ToggleButton.sizes.tsx";
import ToggleButtonStandalone from "examples/mui/ToggleButton.standalone.tsx";
import ToggleButtonText from "examples/mui/ToggleButton.text.tsx";
import { createKnob, DefaultPropsProvider } from "~/~utils.tsx";

import type { KnobProps } from "~/~utils.tsx";

export default function ToggleButtonExamples({
	disabled,
}: KnobProps<typeof knobs>) {
	return (
		<DefaultPropsProvider
			value={{
				MuiToggleButtonGroup: { disabled },
				MuiToggleButton: { disabled },
			}}
		>
			<Stack spacing={4} sx={{ alignItems: "start" }}>
				<ToggleButtonDefault />
				<ToggleButtonStandalone />
				<ToggleButtonSizes />
				<ToggleButtonText />
				<Stack spacing={2} direction="row" sx={{ flexWrap: "wrap" }}>
					<ToggleButtonPlacements_ />
				</Stack>
			</Stack>
		</DefaultPropsProvider>
	);
}

export const knobs = {
	disabled: createKnob({ type: "boolean" }),
};
