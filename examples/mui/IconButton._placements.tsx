/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import IconButton from "@mui/material/IconButton";
import { Icon } from "@stratakit/mui";

import svgPlaceholder from "@stratakit/icons/placeholder.svg";

type IconButtonProps = React.ComponentProps<typeof IconButton>;
const placements = [
	"top",
	"right",
	"bottom",
	"left",
] as const satisfies IconButtonProps["labelPlacement"][];

export default () => {
	return placements.map((placement) => (
		<IconButton
			key={placement}
			label={`${placement.charAt(0).toUpperCase()}${placement.slice(1)}`}
			labelPlacement={placement}
		>
			<Icon href={svgPlaceholder} />
		</IconButton>
	));
};
