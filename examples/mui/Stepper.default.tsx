/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Step, StepLabel, Stepper, Typography } from "@mui/material";

export default () => {
	return (
		<Stepper activeStep={2}>
			<Step>
				<StepLabel>Select campaign settings</StepLabel>
			</Step>
			<Step completed={false}>
				<StepLabel
					optional={<Typography variant="caption">Optional</Typography>}
				>
					Create an ad group
				</StepLabel>
			</Step>
			<Step>
				<StepLabel>Create an ad</StepLabel>
			</Step>
		</Stepper>
	);
};
