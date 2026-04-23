/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import ToggleButton from "@mui/material/ToggleButton";
import { Icon } from "@stratakit/mui";

import svgPlaceholder from "@stratakit/icons/placeholder.svg";

export default () => {
	return (
		<ToggleButton value="disabled" label="Disabled" disabled>
			<Icon href={svgPlaceholder} />
		</ToggleButton>
	);
};
