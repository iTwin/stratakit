/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import Stack from "@mui/material/Stack";
import ChipInteractive_ from "examples/mui/Chip._interactive.tsx";
import ChipClickable from "examples/mui/Chip.clickable.tsx";
import ChipDefault from "examples/mui/Chip.default.tsx";
import ChipDeletable from "examples/mui/Chip.deletable.tsx";
import ChipOutlined from "examples/mui/Chip.outlined.tsx";
import ChipSizes from "examples/mui/Chip.sizes.tsx";
import { createKnob, DefaultPropsProvider } from "~/~utils.tsx";

import type { KnobProps } from "~/~utils.tsx";

export default function ChipExamples({ disabled }: KnobProps<typeof knobs>) {
	return (
		<DefaultPropsProvider
			value={{
				MuiChip: { disabled },
				MuiIconButton: { disabled },
			}}
		>
			<Stack spacing={4} sx={{ alignItems: "start" }}>
				<Stack spacing={2} direction="row" sx={{ flexWrap: "wrap" }}>
					<ChipDefault />
					<ChipOutlined />
					<ChipClickable />
					<ChipDeletable />
					<ChipInteractive_ />
					<ChipSizes />
				</Stack>
			</Stack>
		</DefaultPropsProvider>
	);
}

export const knobs = {
	disabled: createKnob({ type: "boolean" }),
};
