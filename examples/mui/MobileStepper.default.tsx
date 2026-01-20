/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import Button from "@mui/material/Button";
import MobileStepper from "@mui/material/MobileStepper";
import { Icon } from "@stratakit/mui";

import backIcon from "@stratakit/icons/caret-left.svg";
import nextIcon from "@stratakit/icons/caret-right.svg";

export default () => {
	const [activeStep, setActiveStep] = React.useState(0);
	const steps = 3;
	return (
		<MobileStepper
			steps={3}
			activeStep={activeStep}
			variant="text"
			position="static"
			nextButton={
				<Button
					size="small"
					variant="text"
					onClick={() => setActiveStep((prev) => prev + 1)}
					disabled={activeStep === steps - 1}
				>
					Next
					<Icon href={`${nextIcon}#icon-large`} size="large" />
				</Button>
			}
			backButton={
				<Button
					size="small"
					variant="text"
					onClick={() => setActiveStep((prev) => prev - 1)}
					disabled={activeStep === 0}
				>
					<Icon href={`${backIcon}#icon-large`} size="large" />
					Back
				</Button>
			}
		/>
	);
};
