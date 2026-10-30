/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import Stack from "@mui/material/Stack";
import ButtonIcons_ from "examples/mui/Button._icons.tsx";
import ButtonPermutations_ from "examples/mui/Button._permutations.js";
import ButtonColors from "examples/mui/Button.colors.tsx";
import ButtonDefault from "examples/mui/Button.default.tsx";
import ButtonIconOnly from "examples/mui/Button.icon-only.tsx";
import ButtonLoading from "examples/mui/Button.loading.tsx";
import ButtonSizes from "examples/mui/Button.sizes.tsx";
import ButtonVariants from "examples/mui/Button.variants.tsx";
import { createKnob, DefaultPropsProvider } from "~/~utils.tsx";

import type { KnobProps } from "~/~utils.tsx";

export default function ButtonExamples({ disabled }: KnobProps<typeof knobs>) {
	return (
		<DefaultPropsProvider value={{ MuiButton: { disabled } }}>
			<Stack spacing={4} sx={{ alignItems: "start" }}>
				<ButtonDefault />
				<ButtonLoading />
				<ButtonSizes />
				<ButtonVariants />
				<ButtonColors />
				<ButtonIcons_ />
				<ButtonIconOnly />
				<ButtonPermutations_ />
			</Stack>
		</DefaultPropsProvider>
	);
}

export const knobs = {
	disabled: createKnob({ type: "boolean" }),
};
