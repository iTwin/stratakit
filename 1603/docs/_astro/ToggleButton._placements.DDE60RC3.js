var e=`/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import { Icon } from "@stratakit/mui";

import svgArrowDown from "@stratakit/icons/arrow-down.svg";
import svgArrowLeft from "@stratakit/icons/arrow-left.svg";
import svgArrowRight from "@stratakit/icons/arrow-right.svg";
import svgArrowUp from "@stratakit/icons/arrow-up.svg";

type ToggleButtonProps = React.ComponentProps<typeof ToggleButton>;
const placements = [
	"left",
	"top",
	"bottom",
	"right",
] as const satisfies ToggleButtonProps["labelPlacement"][];

const iconByPlacement = {
	left: svgArrowLeft,
	top: svgArrowUp,
	bottom: svgArrowDown,
	right: svgArrowRight,
} as const;

export default () => {
	const [selected, setSelected] = React.useState<string[]>([]);
	return placements.map((placement) => (
		<ToggleButton
			key={placement}
			value={placement}
			label={\`\${placement.charAt(0).toUpperCase()}\${placement.slice(1)}\`}
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
			<Icon href={iconByPlacement[placement]} />
		</ToggleButton>
	));
};
`;export{e as default};