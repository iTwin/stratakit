import { ProgressBar, Text } from "@stratakit/bricks";
import * as React from "react";

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
