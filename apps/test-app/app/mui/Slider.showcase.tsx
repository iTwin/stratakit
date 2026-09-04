/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import SliderDefault from "examples/mui/Slider.default.tsx";
import SliderMarks from "examples/mui/Slider.marks.tsx";
import SliderRange from "examples/mui/Slider.range.tsx";
import SliderSizes from "examples/mui/Slider.sizes.tsx";
import SliderTooltip from "examples/mui/Slider.tooltip.tsx";
import SliderVertical from "examples/mui/Slider.vertical.tsx";
import { createKnob } from "~/~utils.tsx";

export default function SliderExamples() {
	return (
		<>
			<SliderDefault />
			<SliderSizes />
			<SliderTooltip />
			<SliderMarks />
			<SliderRange />
			<SliderVertical />
		</>
	);
}

export const knobs = {
	disabled: createKnob({
		props: {
			MuiFormControl: {
				disabled: true,
			},
			MuiSlider: {
				disabled: true,
			},
		},
	}),
};
