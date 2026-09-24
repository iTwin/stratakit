/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import visuallyHidden from "@mui/utils/visuallyHidden";

import styles from "./Stepper.long.module.css";

function LongStep({ children, ...rest }: React.ComponentProps<typeof Step>) {
	return (
		<Step {...rest}>
			<StepLabel
				slotProps={{
					label: {
						style: visuallyHidden,
					},
				}}
				classes={{
					completed: styles.labelCompleted,
				}}
			>
				{children}
				<span className={styles.completed}> (completed)</span>
			</StepLabel>
		</Step>
	);
}

function StepperTitle({
	index,
	stepNames,
}: {
	index: number;
	stepNames: string[];
}) {
	return (
		<div className={styles.stepperTitle}>
			<Typography aria-hidden render={<span />} color="textSecondary">
				Step {index + 1} of {stepNames.length}:{" "}
			</Typography>{" "}
			<Typography render={<span />} color="textPrimary">
				{stepNames[index]}
			</Typography>
		</div>
	);
}

export default () => {
	const [activeStep, setActiveStep] = React.useState(2);
	const total = 4;

	const stepNames = [
		"Requirements Definition",
		"Architecture Design",
		"Environment Provisioning",
		"Implementation & Integration",
	];

	return (
		<Stack spacing={2}>
			<Stepper activeStep={activeStep} className={styles.long}>
				{stepNames.map((name, index) => (
					<LongStep key={name} completed={index < activeStep}>
						{name}
					</LongStep>
				))}
			</Stepper>
			<StepperTitle stepNames={stepNames} index={activeStep} />

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
