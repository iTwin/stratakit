/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import RatingDefault from "examples/mui/Rating.default.tsx";
import { createKnob } from "~/~utils.tsx";

export default function RatingExamples() {
	return <RatingDefault />;
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
