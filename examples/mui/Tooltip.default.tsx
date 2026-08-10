/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";

export default () => {
	return (
		<Tooltip title="Save is disabled until you finish reading the documentation">
			<Button disabled>Save</Button>
		</Tooltip>
	);
};
