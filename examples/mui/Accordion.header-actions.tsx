/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { IconButton } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import { Icon } from "@stratakit/mui";

import svgAdd from "@stratakit/icons/add.svg";
import styles from "./Accordion.header-actions.module.css";

export default () => {
	return (
		<Accordion
			slotProps={{
				heading: {
					component: "div",
				},
			}}
		>
			<AccordionSummary
				className={styles.summary}
				slotProps={{
					root: {
						component: SummaryRoot,
					},
					expandIconWrapper: {
						className: styles.expander,
					},
				}}
			>
				<Typography render={<span />}>Role management</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<ul>
					<li>Read projects</li>
					<li>Create projects</li>
					<li>Delete projects</li>
				</ul>
			</AccordionDetails>
		</Accordion>
	);
};

function SummaryRoot(props: React.ComponentProps<"div">) {
	return (
		<div className={styles.summaryWrapper}>
			<div {...props} />
			<IconButton label="Add role" edge="end">
				<Icon href={svgAdd} />
			</IconButton>
		</div>
	);
}
