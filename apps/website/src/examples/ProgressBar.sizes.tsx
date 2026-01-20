/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { ProgressBar, Text } from "@stratakit/bricks";
import * as React from "react";

export default () => {
	const labelId = React.useId();

	return (
		<>
			<ProgressBar aria-labelledby={labelId} size="medium" />
			<Text variant="body-sm" id={labelId}>
				Medium
			</Text>

			<ProgressBar aria-labelledby={labelId} size="large" />
			<Text variant="body-sm" id={labelId}>
				Large
			</Text>
		</>
	);
};
