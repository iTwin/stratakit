/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import ButtonIcons_ from "examples/mui/Button._icons.tsx";
import ButtonPermutations_ from "examples/mui/Button._permutations.js";
import ButtonColorPicker from "examples/mui/Button.color-picker.tsx";
import ButtonColors from "examples/mui/Button.colors.tsx";
import ButtonDefault from "examples/mui/Button.default.tsx";
import ButtonFullWidth from "examples/mui/Button.fullWidth.tsx";
import ButtonLoading from "examples/mui/Button.loading.tsx";
import ButtonSizes from "examples/mui/Button.sizes.tsx";
import ButtonVariants from "examples/mui/Button.variants.tsx";
import { createKnob, isProduction } from "~/~utils.tsx";

export default function ButtonExamples() {
	return (
		<>
			<ButtonDefault />
			<ButtonSizes />
			<ButtonVariants />
			<ButtonColors />
			<ButtonColorPicker />
			{!isProduction && <ButtonIcons_ />}
			{!isProduction && <ButtonPermutations_ />}
			<ButtonLoading />
			<ButtonFullWidth />
		</>
	);
}

export const knobs = {
	disabled: createKnob({
		props: {
			MuiButton: {
				disabled: true,
			},
		},
	}),
	loading: createKnob({
		props: {
			MuiButton: {
				loading: true,
			},
		},
	}),
};
