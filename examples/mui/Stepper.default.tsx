/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import visuallyHidden from "@mui/utils/visuallyHidden";

export default () => {
	return (
		<Stepper activeStep={1}>
			<Step>
				<StepLabel>
					Select campaign settings
					<span style={visuallyHidden}> (completed)</span>
				</StepLabel>
			</Step>
			<Step>
				<StepLabel>Create an ad group</StepLabel>
			</Step>
			<Step>
				<StepLabel>Create an ad</StepLabel>
			</Step>
		</Stepper>
	);
};
