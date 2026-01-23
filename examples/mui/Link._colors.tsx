/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Link from "@mui/material/Link";

type LinkProps = React.ComponentProps<typeof Link>;
const colors = [
	"primary",
	"secondary",
	"error",
	"info",
	"success",
	"warning",
] as const satisfies LinkProps["color"][];

export default () => {
	return colors.map((color) => (
		<Link key={color} color={color} href={`#${color}`}>
			{color.charAt(0).toUpperCase()}
			{color.slice(1)}
		</Link>
	));
};
