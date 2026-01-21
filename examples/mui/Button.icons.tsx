/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Button from "@mui/material/Button";
import { Icon } from "@stratakit/mui";

import svgPlaceholder from "@stratakit/icons/placeholder.svg";

export default () => {
	return (
		<>
			<Button startIcon={<Icon href={svgPlaceholder} />}>Start icon</Button>
			<Button endIcon={<Icon href={svgPlaceholder} />}>End icon</Button>
			<Button
				startIcon={<Icon href={svgPlaceholder} />}
				endIcon={<Icon href={svgPlaceholder} />}
			>
				Both icons
			</Button>
		</>
	);
};
