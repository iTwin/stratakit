/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export default () => {
	return (
		<Stack spacing={2} direction="column" sx={{ alignSelf: "stretch" }}>
			<div>
				<Accordion variant="elevation">
					<AccordionSummary>
						<Typography render={<code />}>elevation</Typography> variant
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
						<Typography render={<code />}>outlined</Typography> variant
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
