/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Stepper from "@mui/material/Stepper";
import visuallyHidden from "@mui/utils/visuallyHidden";

export default () => {
	return (
		<Stepper activeStep={1}>
			<Step>
				<StepButton>
					Select campaign settings
					<span style={visuallyHidden}> (completed)</span>
				</StepButton>
			</Step>
			<Step>
				<StepButton>Create an ad group</StepButton>
			</Step>
			<Step>
				<StepButton>Create an ad</StepButton>
			</Step>
		</Stepper>
	);
};
