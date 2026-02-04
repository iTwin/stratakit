/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { ProgressBar, Text } from "@stratakit/bricks";

export default () => {
	const labelId = React.useId();

	return (
		<>
			<ProgressBar aria-labelledby={labelId} tone="neutral" />
			<Text variant="body-sm" id={labelId}>
				Neutral
			</Text>

			<ProgressBar aria-labelledby={labelId} tone="accent" />
			<Text variant="body-sm" id={labelId}>
				Accent
			</Text>
		</>
	);
};
