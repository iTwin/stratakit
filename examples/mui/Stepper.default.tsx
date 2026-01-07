/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Step, StepLabel, Stepper, Typography } from "@mui/material";
import { visuallyHidden } from "@mui/utils";

export default () => {
	return (
		<Stepper activeStep={2} role="list">
			<Step role="listitem">
				<StepLabel>Select campaign settings</StepLabel>
			</Step>
			<Step role="listitem" completed={false}>
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
			<Step role="listitem" aria-current="true">
				<StepLabel>Create an ad</StepLabel>
			</Step>
		</Stepper>
	);
};
