/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Stack from "@mui/material/Stack";

export default () => {
	return (
		<Stack spacing={2} direction="column" sx={{ alignSelf: "stretch" }}>
			<div>
				<Accordion variant="elevation">
					<AccordionSummary>
						<code>elevation</code> variant
					</AccordionSummary>
					<AccordionDetails>
						An elevation accordion does not include a border around its content
						with square corners.
					</AccordionDetails>
				</Accordion>
			</div>
			<div>
				<Accordion variant="outlined">
					<AccordionSummary>
						<code>outlined</code> variant
					</AccordionSummary>
					<AccordionDetails>
						An outlined accordion includes a border around its content with
						rounded corners.
					</AccordionDetails>
				</Accordion>
			</div>
		</Stack>
	);
};
