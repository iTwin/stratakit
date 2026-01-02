/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Button, Tooltip } from "@mui/material";

export default () => {
	return (
		<Tooltip title="Save is disabled until you finish reading the documentation.">
			<span>
				<Button aria-disabled="true" className="Mui-disabled">
					Save
				</Button>
			</span>
		</Tooltip>
	);
};
