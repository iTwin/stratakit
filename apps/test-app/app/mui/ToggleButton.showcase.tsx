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
import { createKnob, isProduction } from "~/~utils.tsx";

export default function ToggleButtonExamples() {
	return (
		<>
			<ToggleButtonDefault />
			<ToggleButtonStandalone />
			<ToggleButtonSizes />
			<ToggleButtonText />
			{!isProduction && (
				<Stack spacing={1} direction="row" sx={{ flexWrap: "wrap" }}>
					<ToggleButtonPlacements_ />
				</Stack>
			)}
		</>
	);
}

export const knobs = {
	disabled: createKnob({
		props: {
			MuiToggleButtonGroup: {
				disabled: true,
			},
			MuiToggleButton: {
				disabled: true,
			},
		},
	}),
};
