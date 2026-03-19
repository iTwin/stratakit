/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import { Icon } from "@stratakit/mui";

import svgInfo from "@stratakit/icons/info.svg";
import styles from "./Accordion.decoration.module.css";

export default () => {
	return (
		<Accordion>
			<AccordionSummary
				slotProps={{
					content: {
						className: styles.summaryContent,
					},
				}}
			>
				<Icon href={svgInfo} />
				<Typography render={<span />}>What is StrataKit?</Typography>
			</AccordionSummary>
			<AccordionDetails>
				StrataKit is Bentley Systems' open source design system and the
				successor to iTwinUI.
			</AccordionDetails>
		</Accordion>
	);
};
