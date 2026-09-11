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
import visuallyHidden from "@mui/utils/visuallyHidden";

import styles from "./Stepper.long.module.css";

export default () => {
	const [activeStep, setActiveStep] = React.useState(3);
	return (
		<Stack spacing={2}>
			<Stepper activeStep={activeStep} className={styles.long}>
				<Step>
					<StepLabel>
						<span aria-hidden className={styles.stepOfStep}>
							Step 1 of 7:{" "}
						</span>
						Requirements Definition
						<span style={visuallyHidden}> (completed)</span>
					</StepLabel>
				</Step>
				<Step>
					<StepLabel>
						<span aria-hidden className={styles.stepOfStep}>
							Step 2 of 7:{" "}
						</span>
						Architecture Design
					</StepLabel>
				</Step>
				<Step>
					<StepLabel>
						<span aria-hidden className={styles.stepOfStep}>
							Step 3 of 7:{" "}
						</span>
						Environment Provisioning
					</StepLabel>
				</Step>
				<Step>
					<StepLabel>
						<span aria-hidden className={styles.stepOfStep}>
							Step 4 of 7:{" "}
						</span>
						Implementation & Integration
					</StepLabel>
				</Step>
				<Step>
					<StepLabel>
						<span aria-hidden className={styles.stepOfStep}>
							Step 5 of 7:{" "}
						</span>
						Testing & Validation
					</StepLabel>
				</Step>
				<Step>
					<StepLabel>
						<span aria-hidden className={styles.stepOfStep}>
							Step 6 of 7:{" "}
						</span>
						Deployment & Release
					</StepLabel>
				</Step>
				<Step>
					<StepLabel>
						<span aria-hidden className={styles.stepOfStep}>
							Step 7 of 7:{" "}
						</span>
						Monitoring & Optimization
					</StepLabel>
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
					disabled={activeStep >= 6}
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
