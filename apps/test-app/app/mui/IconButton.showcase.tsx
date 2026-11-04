/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { IconButton } from "@mui/material";
import Stack from "@mui/material/Stack";
import { Icon } from "@stratakit/foundations";
import { svgError } from "@stratakit/icons/error";
import IconButtonPlacements_ from "examples/mui/IconButton._placements.tsx";
import IconButtonColors from "examples/mui/IconButton.colors.tsx";
import IconButtonDefault from "examples/mui/IconButton.default.tsx";
import IconButtonSizes from "examples/mui/IconButton.sizes.tsx";
import IconButtonVariants from "examples/mui/IconButton.variants.tsx";
import { createKnob, DefaultPropsProvider } from "~/~utils.tsx";

import type { KnobProps } from "~/~utils.tsx";

export default function IconButtonExamples({
	disabled,
}: KnobProps<typeof knobs>) {
	return (
		<DefaultPropsProvider value={{ MuiIconButton: { disabled } }}>
			<Stack spacing={4} sx={{ alignItems: "start" }}>
				<IconButtonDefault />
				<IconButtonSizes />
				<IconButtonVariants />
				<IconButtonColors />
				<Stack spacing={2} direction="row" sx={{ flexWrap: "wrap" }}>
					<IconButtonPlacements_ />
				</Stack>
			</Stack>
		</DefaultPropsProvider>
	);
}

export const knobs = {
	disabled: createKnob({ type: "boolean" }),
};

export const InvalidColors = () => {
	return (
		/* @ts-expect-error force invalid color to tests implementations not using StrataKit types */
		<IconButton color="default" title="default">
			<Icon href={svgError} />
		</IconButton>
	);
};
