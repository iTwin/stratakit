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
					<AccordionSummary markerPosition="start">
						<Typography render={<span />}>
							Logical property <code>start</code>
						</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<code>start</code> will display to the left when reading direction
						is set to LTR, and to the right when reading direction is set to
						RTL.
					</AccordionDetails>
				</Accordion>
			</div>

			<div>
				<Accordion>
					<AccordionSummary markerPosition="end">
						<Typography render={<span />}>
							Logical property <code>end</code>
						</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<code>end</code> will display to the right when reading direction is
						set to LTR, and to the left when reading direction is set to RTL.
					</AccordionDetails>
				</Accordion>
			</div>
		</>
	);
};
