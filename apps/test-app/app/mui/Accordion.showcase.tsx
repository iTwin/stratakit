/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import Stack from "@mui/material/Stack";
import AccordionMultipleOutlined_ from "examples/mui/Accordion._multiple-outlined.tsx";
import AccordionActions from "examples/mui/Accordion.actions.tsx";
import AccordionDecoration from "examples/mui/Accordion.decoration.tsx";
import AccordionDefault from "examples/mui/Accordion.default.tsx";
import AccordionExpanded from "examples/mui/Accordion.expanded.tsx";
import AccordionMarkerPlacement from "examples/mui/Accordion.marker-placement.tsx";
import AccordionMultiple from "examples/mui/Accordion.multiple.tsx";
import AccordionResponsive from "examples/mui/Accordion.responsive.tsx";
import AccordionVariants from "examples/mui/Accordion.variants.tsx";
import { createKnob, isProduction } from "~/~utils.tsx";

export default function AccordionExamples() {
	return (
		<Stack spacing={2} sx={{ alignSelf: "stretch" }}>
			<div>
				<AccordionDefault />
			</div>
			<div>
				<AccordionExpanded />
			</div>
			<AccordionResponsive />
			<div>
				<AccordionMarkerPlacement />
			</div>
			<div>
				<AccordionDecoration />
			</div>
			<div>
				<AccordionActions />
			</div>
			<AccordionMultiple />
			{!isProduction && <AccordionMultipleOutlined_ />}
			<AccordionVariants />
		</Stack>
	);
}

export const knobs = {
	disabled: createKnob({
		props: {
			MuiAccordion: {
				disabled: true,
			},
		},
	}),
};
