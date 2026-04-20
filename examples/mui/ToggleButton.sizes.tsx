/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import Stack from "@mui/material/Stack";
import ToggleButton from "@mui/material/ToggleButton";
import { Icon } from "@stratakit/mui";

import svgPlaceholder from "@stratakit/icons/placeholder.svg";

export default () => {
	const [isSelected, onChange] = useSelected();
	return (
		<Stack spacing={1} direction="row" sx={{ alignItems: "center" }}>
			<ToggleButton
				value="small"
				size="small"
				label="Small"
				selected={isSelected("small")}
				onChange={onChange}
			>
				<Icon href={svgPlaceholder} />
			</ToggleButton>
			<ToggleButton
				value="medium"
				label="Medium"
				selected={isSelected("medium")}
				onChange={onChange}
			>
				<Icon href={svgPlaceholder} />
			</ToggleButton>
			<ToggleButton
				value="large"
				size="large"
				label="Large"
				selected={isSelected("large")}
				onChange={onChange}
			>
				<Icon href={svgPlaceholder} />
			</ToggleButton>
		</Stack>
	);
};

type ToggleButtonProps = React.ComponentProps<typeof ToggleButton>;

function useSelected() {
	const [selected, setSelected] = React.useState<string[]>([]);
	const onChange = ((_, value) => {
		setSelected((prev) => {
			if (prev.includes(value)) {
				return prev.filter((v) => v !== value);
			}
			return [...prev, value];
		});
	}) satisfies ToggleButtonProps["onChange"];
	const isSelected = (value: string) => selected.includes(value);
	return [isSelected, onChange] as const;
}
