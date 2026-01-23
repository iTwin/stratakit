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
			<ProgressBar value={50} aria-labelledby={labelId} />
			<Text variant="body-sm" id={labelId}>
				Uploading files…
			</Text>
		</>
	);
};
