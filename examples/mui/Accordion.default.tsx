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
			<AccordionSummary>
				<Typography render={<span />}>What is StrataKit?</Typography>
			</AccordionSummary>
			<AccordionDetails>
				StrataKit is Bentley Systems' open source design system and the
				successor to iTwinUI.
			</AccordionDetails>
		</Accordion>
	);
};
