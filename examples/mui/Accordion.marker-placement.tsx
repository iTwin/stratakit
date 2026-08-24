/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";

export default () => {
	return (
		<>
			<div>
				<Accordion>
					<AccordionSummary markerPlacement="start">
						Marker placement <code>start</code>
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
						Marker placement <code>end</code>
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
