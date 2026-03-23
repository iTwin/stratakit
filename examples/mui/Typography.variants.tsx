/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Typography from "@mui/material/Typography";

import type * as React from "react";

type TypographyProps = React.ComponentProps<typeof Typography>;
const variants = [
	"body1",
	"body2",
	"button",
	"caption",
	"h1",
	"h2",
	"h3",
	"h4",
	"h5",
	"h6",
	"inherit",
	"overline",
	"subtitle1",
	"subtitle2",
] as const satisfies TypographyProps["variant"][];

export default () => {
	return variants.map((variant) => {
		return (
			<Typography key={variant} variant={variant}>
				{variant.charAt(0).toUpperCase()}
				{variant.slice(1)}
			</Typography>
		);
	});
};
