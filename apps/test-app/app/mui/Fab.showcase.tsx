/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import Stack from "@mui/material/Stack";
import FabDefault from "examples/mui/Fab.default.tsx";
import { createKnob, DefaultPropsProvider } from "~/~utils.tsx";

import type { KnobProps } from "~/~utils.tsx";

export default function FabExamples({
	color,
	disabled,
}: KnobProps<typeof knobs>) {
	return (
		<DefaultPropsProvider
			value={{
				MuiFab: {
					...(color && { color }),
					disabled,
				},
			}}
		>
			<Stack spacing={4} sx={{ alignItems: "start" }}>
				<FabDefault />
			</Stack>
		</DefaultPropsProvider>
	);
}

export const knobs = {
	color: createKnob({ type: "select", options: ["secondary"] }),
	disabled: createKnob({ type: "boolean" }),
};
