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
						<Typography render={<span />}>
							Marker position <code>start</code>
						</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<code>start</code> aligns the marker with the inline-start edge:
						left in LTR and right in RTL.
					</AccordionDetails>
				</Accordion>
			</div>

			<div>
				<Accordion>
					<AccordionSummary markerPlacement="end">
						<Typography render={<span />}>
							Marker position <code>end</code>
						</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<code>end</code> aligns the marker with the inline-end edge: right
						in LTR and left in RTL.
					</AccordionDetails>
				</Accordion>
			</div>
		</>
	);
};
