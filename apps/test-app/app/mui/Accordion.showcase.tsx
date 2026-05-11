/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import Stack from "@mui/material/Stack";
import AccordionActions from "examples/mui/Accordion.actions.tsx";
import AccordionDecoration from "examples/mui/Accordion.decoration.tsx";
import AccordionDefault from "examples/mui/Accordion.default.tsx";
import AccordionExpanded from "examples/mui/Accordion.expanded.tsx";
import AccordionMarkerLeft from "examples/mui/Accordion.marker-left.tsx";
import AccordionMultiple from "examples/mui/Accordion.multiple.tsx";
import AccordionVariants from "examples/mui/Accordion.variants.tsx";

export default function AccordionExamples() {
	return (
		<Stack spacing={1} sx={{ alignSelf: "stretch" }}>
			<div>
				<AccordionDefault />
			</div>
			<div>
				<AccordionExpanded />
			</div>
			<div>
				<AccordionMarkerLeft />
			</div>
			<div>
				<AccordionDecoration />
			</div>
			<div>
				<AccordionActions />
			</div>
			<AccordionMultiple />
			<AccordionVariants />
		</Stack>
	);
}
