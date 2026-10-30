/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import Stack from "@mui/material/Stack";
import RatingDefault from "examples/mui/Rating.default.tsx";
import RatingPrecision from "examples/mui/Rating.precision.tsx";
import RatingSizes from "examples/mui/Rating.sizes.tsx";
import { createKnob, DefaultPropsProvider } from "~/~utils.tsx";

import type { KnobProps } from "~/~utils.tsx";

export default function RatingExamples({ disabled }: KnobProps<typeof knobs>) {
	return (
		<DefaultPropsProvider
			value={{
				MuiFormControl: { disabled },
				MuiRating: { disabled },
			}}
		>
			<Stack spacing={4} sx={{ alignItems: "start" }}>
				<RatingDefault />
				<RatingSizes />
				<RatingPrecision />
			</Stack>
		</DefaultPropsProvider>
	);
}

export const knobs = {
	disabled: createKnob({ type: "boolean" }),
};
