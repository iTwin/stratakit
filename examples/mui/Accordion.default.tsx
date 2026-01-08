/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Typography,
} from "@mui/material";

export default () => {
	const id = React.useId();
	return (
		<Accordion>
			<AccordionSummary aria-controls={`${id}-content`} id={`${id}-header`}>
				<Typography component="span">What is StrataKit?</Typography>
			</AccordionSummary>
			<AccordionDetails>
				StrataKit is Bentley Systems' open source design system and the
				successor to iTwinUI.
			</AccordionDetails>
		</Accordion>
	);
};
