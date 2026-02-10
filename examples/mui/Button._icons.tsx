/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Icon } from "@stratakit/mui";

import svgPlaceholder from "@stratakit/icons/placeholder.svg";

export default () => {
	return (
		<Stack spacing={1} direction="row">
			<Button startIcon={<Icon href={svgPlaceholder} />}>Start icon</Button>
			<Button endIcon={<Icon href={svgPlaceholder} />}>End icon</Button>
			<Button
				startIcon={<Icon href={svgPlaceholder} />}
				endIcon={<Icon href={svgPlaceholder} />}
			>
				Both icons
			</Button>
		</Stack>
	);
};
