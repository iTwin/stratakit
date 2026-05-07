/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import { Icon } from "@stratakit/mui";

import svgPlaceholder from "@stratakit/icons/placeholder.svg";

type ToggleButtonProps = React.ComponentProps<typeof ToggleButton>;
const placements = [
	"top",
	"right",
	"bottom",
	"left",
] as const satisfies ToggleButtonProps["labelPlacement"][];

export default () => {
	const [selected, setSelected] = React.useState<string[]>([]);
	return placements.map((placement) => (
		<ToggleButton
			key={placement}
			value={placement}
			label={`${placement.charAt(0).toUpperCase()}${placement.slice(1)}`}
			labelPlacement={placement}
			selected={selected.includes(placement)}
			onChange={() =>
				setSelected((prev) =>
					prev.includes(placement)
						? prev.filter((p) => p !== placement)
						: [...prev, placement],
				)
			}
		>
			<Icon href={svgPlaceholder} />
		</ToggleButton>
	));
};
