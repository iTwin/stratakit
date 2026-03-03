/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Badge from "@mui/material/Badge";
import Stack from "@mui/material/Stack";

import type * as React from "react";

type BadgeProps = React.ComponentProps<typeof Badge>;
const colors = [
	"default",
	"error",
	"info",
	"primary",
	"secondary",
	"success",
	"warning",
] as const satisfies BadgeProps["color"][];

export default () => {
	return (
		<Stack spacing={1} direction="row">
			{colors.map((color) => (
				<Badge
					key={color}
					badgeContent={`${color.charAt(0).toUpperCase()}${color.slice(1)}`}
					color={color}
					inline
				/>
			))}
		</Stack>
	);
};
