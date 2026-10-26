/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import Stack from "@mui/material/Stack";
import SliderDefault from "examples/mui/Slider.default.tsx";
import SliderMarks from "examples/mui/Slider.marks.tsx";
import SliderRange from "examples/mui/Slider.range.tsx";
import SliderSizes from "examples/mui/Slider.sizes.tsx";
import SliderTooltip from "examples/mui/Slider.tooltip.tsx";
import SliderVertical from "examples/mui/Slider.vertical.tsx";
import { createKnob, DefaultPropsProvider } from "~/~utils.tsx";

import type { KnobProps } from "~/~utils.tsx";

export default function SliderExamples({ disabled }: KnobProps<typeof knobs>) {
	return (
		<DefaultPropsProvider
			value={{
				MuiFormControl: { disabled },
				MuiSlider: { disabled },
			}}
		>
			<Stack spacing={4} sx={{ alignItems: "start" }}>
				<SliderDefault />
				<SliderSizes />
				<SliderTooltip />
				<SliderMarks />
				<SliderRange />
				<SliderVertical />
			</Stack>
		</DefaultPropsProvider>
	);
}

export const knobs = {
	disabled: createKnob({ type: "boolean" }),
};
