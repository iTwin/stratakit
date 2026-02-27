/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Chip from "@mui/material/Chip";

type ChipProps = React.ComponentProps<typeof Chip>;
const colors = [
	"default",
	"error",
	"info",
	"primary",
	"secondary",
	"success",
	"warning",
] as const satisfies ChipProps["color"][];

export default () => {
	return colors.map((color) => (
		<Chip
			key={color}
			color={color}
			label={`${color.charAt(0).toUpperCase()}${color.slice(1)}`}
		/>
	));
};
