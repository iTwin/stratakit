import { ProgressBar, Text } from "@stratakit/bricks";
import * as React from "react";

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
