/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Badge from "@mui/material/Badge";
import Stack from "@mui/material/Stack";

export default () => {
	return (
		<Stack spacing={1} direction="row">
			<Badge badgeContent="Error" color="error" inline />
			<Badge badgeContent="Info" color="info" inline />
			<Badge badgeContent="Primary" color="primary" inline />
			<Badge badgeContent="Secondary" color="secondary" inline />
			<Badge badgeContent="Success" color="success" inline />
			<Badge badgeContent="Warning" color="warning" inline />
		</Stack>
	);
};
