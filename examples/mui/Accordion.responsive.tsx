/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";

import styles from "./Accordion.responsive.module.css";

export default () => {
	return (
		<div className={styles.container}>
			<Accordion variant="outlined">
				<AccordionSummary>What is responsive design?</AccordionSummary>
				<AccordionDetails>
					Responsive design is a web development approach that ensures a
					website's layout, images, and text automatically adjust and scale to
					fit any screen size or device.
				</AccordionDetails>
			</Accordion>
		</div>
	);
};
