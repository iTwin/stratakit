/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import RatingDefault from "examples/mui/Rating.default.tsx";
import RatingPrecision from "examples/mui/Rating.precision.tsx";
import RatingSizes from "examples/mui/Rating.sizes.tsx";
import { createKnob } from "~/~utils.tsx";

export default function RatingExamples() {
	return (
		<>
			<RatingDefault />
			<RatingSizes />
			<RatingPrecision />
		</>
	);
}

export const knobs = {
	disabled: createKnob({
		props: {
			MuiFormControl: {
				disabled: true,
			},
			MuiRating: {
				disabled: true,
			},
		},
	}),
};
