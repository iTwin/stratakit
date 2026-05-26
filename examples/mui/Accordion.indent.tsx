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
		<Accordion>
			<AccordionSummary markerPlacement="start">
				<Typography render={<span />}>
					What is <code>startIndent</code>?
				</Typography>
			</AccordionSummary>
			<AccordionDetails startIndent>
				The <code>startIndent</code> prop aligns the details content with the
				summary title.
			</AccordionDetails>
		</Accordion>
	);
};
