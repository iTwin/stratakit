/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Stepper from "@mui/material/Stepper";
import { visuallyHidden } from "@mui/utils";

export default () => {
	return (
		<Stepper activeStep={1} role="list">
			<Step role="listitem">
				<StepButton>
					Select campaign settings
					<span style={visuallyHidden}> (completed)</span>
				</StepButton>
			</Step>
			<Step role="listitem" aria-current="true">
				<StepButton>Create an ad group</StepButton>
			</Step>
			<Step role="listitem">
				<StepButton>Create an ad</StepButton>
			</Step>
		</Stepper>
	);
};
