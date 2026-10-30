/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import visuallyHidden from "@mui/utils/visuallyHidden";
import { svgPlaceholder } from "@stratakit/icons/placeholder";
import { Icon } from "@stratakit/mui";

export default () => {
	return (
		<Stack
			spacing={2}
			direction="row"
			sx={{ alignItems: "center", flexWrap: "wrap" }}
		>
			<Button aria-label="Label">
				<Icon href={svgPlaceholder} />
			</Button>
			<Button aria-label="Label" startIcon={<Icon href={svgPlaceholder} />} />
			<Button aria-label="Label" endIcon={<Icon href={svgPlaceholder} />} />
			<Button>
				<span style={visuallyHidden}>Label</span>
				<Icon href={svgPlaceholder} />
			</Button>
		</Stack>
	);
};
