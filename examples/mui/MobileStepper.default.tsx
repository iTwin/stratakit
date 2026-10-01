/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import Button from "@mui/material/Button";
import MobileStepper from "@mui/material/MobileStepper";
import { svgChevronLeft } from "@stratakit/icons/chevron-left";
import { svgChevronRight } from "@stratakit/icons/chevron-right";
import { Icon } from "@stratakit/mui";

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
					<Icon href={svgChevronRight} />
				</Button>
			}
			backButton={
				<Button
					size="small"
					variant="text"
					onClick={() => setActiveStep((prev) => prev - 1)}
					disabled={activeStep === 0}
				>
					<Icon href={svgChevronLeft} />
					Back
				</Button>
			}
		/>
	);
};
