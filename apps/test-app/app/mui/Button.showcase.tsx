/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import visuallyHidden from "@mui/utils/visuallyHidden";
import { svgPlaceholder } from "@stratakit/icons/placeholder";
import { Icon } from "@stratakit/mui";
import ButtonPermutations_ from "examples/mui/Button._permutations.js";
import ButtonColors from "examples/mui/Button.colors.tsx";
import ButtonDefault from "examples/mui/Button.default.tsx";
import ButtonIcon from "examples/mui/Button.icon.tsx";
import ButtonLoading from "examples/mui/Button.loading.tsx";
import ButtonSizes from "examples/mui/Button.sizes.tsx";
import ButtonVariants from "examples/mui/Button.variants.tsx";
import { createKnob, DefaultPropsProvider } from "~/~utils.tsx";

import type { KnobProps } from "~/~utils.tsx";

export default function ButtonExamples({
	disabled,
	size,
}: KnobProps<typeof knobs>) {
	return (
		<DefaultPropsProvider value={{ MuiButton: { disabled, size } }}>
			<Stack spacing={4} sx={{ alignItems: "start" }}>
				<ButtonDefault />
				<ButtonLoading />
				<ButtonSizes />
				<ButtonVariants />
				<ButtonColors />
				<ButtonIcons />
				<ButtonIconOnly />
				<ButtonPermutations_ />
			</Stack>
		</DefaultPropsProvider>
	);
}

export const knobs = {
	disabled: createKnob({ type: "boolean" }),
	size: createKnob({ type: "select", options: ["small", "medium", "large"] }),
};

export function ButtonIcons() {
	return (
		<Stack spacing={2} direction="row" sx={{ flexWrap: "wrap" }}>
			<ButtonIcon />
			<Button startIcon={<Icon href={svgPlaceholder} />}>Start icon</Button>
			<Button
				startIcon={<Icon href={svgPlaceholder} />}
				endIcon={<Icon href={svgPlaceholder} />}
			>
				Both icons
			</Button>
		</Stack>
	);
}

export function ButtonIconOnly() {
	return (
		<Stack
			spacing={2}
			direction="row"
			sx={{ alignItems: "center", flexWrap: "wrap" }}
		>
			<Button aria-label="Label">
				<Icon href={svgPlaceholder} />
			</Button>
			<Button aria-label="Label" startIcon={<Icon href={svgPlaceholder} />} />
			<Button aria-label="Label" endIcon={<Icon href={svgPlaceholder} />} />
			<Button>
				<span style={visuallyHidden}>Label</span>
				<Icon href={svgPlaceholder} />
			</Button>
		</Stack>
	);
}
