/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Badge from "@mui/material/Badge";
import Stack from "@mui/material/Stack";

export default () => {
	return (
		<Stack spacing={1} direction="row">
			<Badge badgeContent="Solid" variant="solid" inline />
			<Badge badgeContent="Muted" variant="muted" inline />
			<Badge badgeContent="Outline" variant="outline" inline />
		</Stack>
	);
};
