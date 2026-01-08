/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { Icon } from "@stratakit/mui";

import placeholderIcon from "@stratakit/icons/placeholder.svg";

type IconButtonProps = React.ComponentProps<typeof IconButton>;
const colors = [
	"default",
	"primary",
	"secondary",
	"error",
	"info",
	"success",
	"warning",
] as const satisfies IconButtonProps["color"][];

export default () => {
	return colors.map((color) => (
		<Tooltip
			key={color}
			title={`${color.charAt(0).toUpperCase()}${color.slice(1)}`}
		>
			<IconButton color={color}>
				<Icon href={placeholderIcon} />
			</IconButton>
		</Tooltip>
	));
};
