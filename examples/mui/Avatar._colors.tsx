/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

import type { CSSProperties } from "react";

export default () => {
	const [color, setColor] = useState("#188166");

	return (
		<Stack
			spacing={2}
			direction="row"
			sx={{ flexWrap: "wrap", alignItems: "center" }}
		>
			<input
				aria-label="Avatar background color"
				type="color"
				value={color}
				onChange={(event) => setColor(event.target.value)}
			/>
			<Avatar
				aria-label="Kit Stratan"
				role="img"
				style={
					{
						"--stratakit-mui-palette-Avatar-defaultBg": color,
					} as CSSProperties
				}
			>
				<abbr aria-hidden="true">K</abbr>
			</Avatar>
		</Stack>
	);
};
