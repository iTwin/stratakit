/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import IconButton from "@mui/material/IconButton";
import { Icon } from "@stratakit/mui";

import svgPlaceholder from "@stratakit/icons/placeholder.svg";

type IconButtonProps = React.ComponentProps<typeof IconButton>;
const colors = [
	"primary",
	"secondary",
	"error",
] as const satisfies IconButtonProps["color"][];

export default () => {
	return colors.map((color) => (
		<IconButton
			key={color}
			color={color}
			label={`${color.charAt(0).toUpperCase()}${color.slice(1)}`}
		>
			<Icon href={svgPlaceholder} />
		</IconButton>
	));
};
