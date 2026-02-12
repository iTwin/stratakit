/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
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
				<Typography render={<span />}>What is StrataKit?</Typography>
			</AccordionSummary>
			<AccordionDetails>
				StrataKit is Bentley Systems' open source design system and the
				successor to iTwinUI.
			</AccordionDetails>
		</Accordion>
	);
};
