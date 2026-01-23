/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default () => {
	const id = React.useId();
	return (
		<Accordion
			variant="outlined"
			slotProps={{
				region: {
					role: undefined,
					"aria-labelledby": undefined,
				},
			}}
		>
			<AccordionSummary aria-controls={`${id}-content`}>
				<Typography component="span">What is a design system?</Typography>
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
