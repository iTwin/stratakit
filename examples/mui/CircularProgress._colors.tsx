/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

type CircularProgressProps = React.ComponentProps<typeof CircularProgress>;
const colors = [
	"secondary",
	"primary",
] as const satisfies CircularProgressProps["color"][];

export default () => {
	const exampleId = React.useId();

	return colors.map((color) => {
		const labelId = `${exampleId}-${color}`;
		return (
			<div key={color}>
				<CircularProgress aria-labelledby={labelId} color={color} />
				<Typography id={labelId}>
					{color.charAt(0).toUpperCase()}
					{color.slice(1)}…
				</Typography>
			</div>
		);
	});
};
