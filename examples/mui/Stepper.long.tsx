/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Step, { useStepContext } from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import visuallyHidden from "@mui/utils/visuallyHidden";

import styles from "./Stepper.long.module.css";

function LongStepLabel({
	children,
	index,
	total,
	...rest
}: React.ComponentProps<typeof StepLabel> & { index: number; total: number }) {
	const context = useStepContext();
	console.debug(context);
	return (
		<StepLabel
			{...rest}
			slotProps={{
				label: {
					className: styles.label,
				},
			}}
			classes={{
				active: styles.labelActive,
				completed: styles.labelCompleted,
			}}
		>
			<span aria-hidden className={styles.stepNOfStepTotal}>
				Step {index + 1} of {total}:{" "}
			</span>
			{children}
			<span style={visuallyHidden} className={styles.completed}>
				{" "}
				(completed)
			</span>
		</StepLabel>
	);
}

export default () => {
	const [activeStep, setActiveStep] = React.useState(2);
	const total = 4;

	return (
		<Stack spacing={2}>
			<Stepper activeStep={activeStep} className={styles.long}>
				<Step>
					<LongStepLabel index={0} total={total}>
						Requirements Definition
					</LongStepLabel>
				</Step>
				<Step>
					<LongStepLabel index={1} total={total}>
						Architecture Design
					</LongStepLabel>
				</Step>
				<Step>
					<LongStepLabel index={2} total={total}>
						Environment Provisioning
					</LongStepLabel>
				</Step>
				<Step>
					<LongStepLabel index={3} total={total}>
						Implementation & Integration
					</LongStepLabel>
				</Step>
			</Stepper>
			<Stack direction="row" spacing={1}>
				<Button
					onClick={() => setActiveStep((step) => step - 1)}
					disabled={activeStep < 1}
				>
					Previous
				</Button>
				<Button
					color="primary"
					disabled={activeStep >= total - 1}
					onClick={() => {
						setActiveStep((step) => step + 1);
					}}
				>
					Next
				</Button>
			</Stack>
		</Stack>
	);
};
