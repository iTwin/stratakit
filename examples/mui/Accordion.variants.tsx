/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export default () => {
	const id = React.useId();
	return (
		<Stack spacing={1} direction="column">
			<div>
				<Accordion
					variant="outlined"
					slotProps={{
						region: {
							role: undefined,
							"aria-labelledby": undefined,
						},
					}}
				>
					<AccordionSummary aria-controls={`${id}-outlined-1-content`}>
						<Typography render={<span />}>Outlined 1</Typography>
					</AccordionSummary>
					<AccordionDetails>Outlined 1 content</AccordionDetails>
				</Accordion>
				<Accordion
					variant="outlined"
					slotProps={{
						region: {
							role: undefined,
							"aria-labelledby": undefined,
						},
					}}
				>
					<AccordionSummary aria-controls={`${id}-outlined-2-content`}>
						<Typography render={<span />}>Outlined 2</Typography>
					</AccordionSummary>
					<AccordionDetails>Outlined 2 content</AccordionDetails>
				</Accordion>
			</div>
			<div>
				<Accordion
					variant="elevation"
					slotProps={{
						region: {
							role: undefined,
							"aria-labelledby": undefined,
						},
					}}
				>
					<AccordionSummary aria-controls={`${id}-elevation-1-content`}>
						<Typography render={<span />}>Elevation 1</Typography>
					</AccordionSummary>
					<AccordionDetails>Elevation 1 content</AccordionDetails>
				</Accordion>
				<Accordion
					variant="elevation"
					slotProps={{
						region: {
							role: undefined,
							"aria-labelledby": undefined,
						},
					}}
				>
					<AccordionSummary aria-controls={`${id}-elevation-2-content`}>
						<Typography render={<span />}>Elevation 2</Typography>
					</AccordionSummary>
					<AccordionDetails>Elevation 2 content</AccordionDetails>
				</Accordion>
			</div>
		</Stack>
	);
};
