/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import visuallyHidden from "@mui/utils/visuallyHidden";

export default () => {
	return (
		<Stepper activeStep={2}>
			<Step>
				<StepLabel>Select campaign settings</StepLabel>
			</Step>
			<Step completed={false}>
				<StepLabel
					optional={
						<Typography variant="caption" aria-hidden="true">
							Optional
						</Typography>
					}
				>
					Create an ad group
					<span style={visuallyHidden}>, optional</span>
				</StepLabel>
			</Step>
			<Step>
				<StepLabel>Create an ad</StepLabel>
			</Step>
		</Stepper>
	);
};
