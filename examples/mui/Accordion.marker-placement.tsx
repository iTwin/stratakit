/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";

export default () => {
	return (
		<>
			<div>
				<Accordion>
					<AccordionSummary markerPlacement="start">
						Marker placement <Typography render={<code />}>start</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Typography render={<code />}>start</Typography> aligns the marker
						with the inline-start edge: left in LTR and right in RTL.
					</AccordionDetails>
				</Accordion>
			</div>

			<div>
				<Accordion>
					<AccordionSummary markerPlacement="end">
						Marker placement <Typography render={<code />}>end</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Typography render={<code />}>end</Typography> aligns the marker
						with the inline-end edge: right in LTR and left in RTL.
					</AccordionDetails>
				</Accordion>
			</div>
		</>
	);
};
