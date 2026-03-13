/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default () => {
	return (
		<Accordion>
			<AccordionSummary>
				<Typography render={<span />}>What is a design system?</Typography>
			</AccordionSummary>
			<AccordionDetails>
				A design system is a comprehensive framework of standards, reusable
				components, and documentation that guides the consistent development of
				digital products.
			</AccordionDetails>
			<AccordionActions>
				<Button>Cancel</Button>
				<Button>Agree</Button>
			</AccordionActions>
		</Accordion>
	);
};
