/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";

export default () => {
	return (
		<Accordion size="small">
			<AccordionSummary>
				<code>small</code> size
			</AccordionSummary>
			<AccordionDetails>
				A more compact accordion for dense layouts.
			</AccordionDetails>
		</Accordion>
	);
};
