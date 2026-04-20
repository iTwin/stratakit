/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import { Icon } from "@stratakit/mui";

import svgPlaceholder from "@stratakit/icons/placeholder.svg";

type ToggleButtonProps = React.ComponentProps<typeof ToggleButton>;
const colors = [
	"primary",
	"secondary",
	"error",
] as const satisfies ToggleButtonProps["color"][];

export default () => {
	const [selected, setSelected] = React.useState<string[]>([]);
	return colors.map((color) => (
		<ToggleButton
			key={color}
			value={color}
			color={color}
			label={`${color.charAt(0).toUpperCase()}${color.slice(1)}`}
			selected={selected.includes(color)}
			onChange={(_, value) => {
				setSelected((prev) => {
					if (prev.includes(value)) {
						return prev.filter((v) => v !== value);
					}
					return [...prev, value];
				});
			}}
		>
			<Icon href={svgPlaceholder} />
		</ToggleButton>
	));
};
