/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";

type LinearProgressProps = React.ComponentProps<typeof LinearProgress>;
const colors = [
	"secondary",
	"primary",
] as const satisfies LinearProgressProps["color"][];

export default () => {
	const exampleId = React.useId();

	return colors.map((color) => {
		const labelId = `${exampleId}-${color}`;
		return (
			<React.Fragment key={color}>
				<LinearProgress aria-labelledby={labelId} color={color} />
				<Typography id={labelId}>
					{color.charAt(0).toUpperCase()}
					{color.slice(1)}…
				</Typography>
			</React.Fragment>
		);
	});
};
