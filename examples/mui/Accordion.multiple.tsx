/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

export default () => {
	const id = React.useId();
	return (
		<div>
			<Accordion
				variant="outlined"
				slotProps={{
					region: {
						role: undefined,
						"aria-labelledby": undefined,
					},
					heading: {
						component: "div",
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

			<Accordion
				variant="outlined"
				slotProps={{
					region: {
						role: undefined,
						"aria-labelledby": undefined,
					},
					heading: {
						component: "div",
					},
				}}
			>
				<AccordionSummary aria-controls={`${id}-content`}>
					<Typography render={<span />}>What is a design system?</Typography>
				</AccordionSummary>
				<AccordionDetails>
					A design system is a comprehensive framework of standards, reusable
					components, and documentation that guides the consistent development
					of digital products.
				</AccordionDetails>
			</Accordion>

			<Accordion
				variant="outlined"
				slotProps={{
					region: {
						role: undefined,
						"aria-labelledby": undefined,
					},
					heading: {
						component: "div",
					},
				}}
			>
				<AccordionSummary aria-controls={`${id}-content`}>
					<Typography render={<span />}>What is design?</Typography>
				</AccordionSummary>
				<AccordionDetails>
					“Design is when designers design a design to produce a design.” —{" "}
					<Link href="https://academic.oup.com/book/790">
						<cite>Design: A Very Short Introduction</cite>
					</Link>
				</AccordionDetails>
			</Accordion>
		</div>
	);
};
