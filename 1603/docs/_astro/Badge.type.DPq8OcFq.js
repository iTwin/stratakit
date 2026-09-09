var e=`/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Badge from "@mui/material/Badge";
import Stack from "@mui/material/Stack";

export default () => {
	return (
		<Stack spacing={2} direction="row" sx={{ flexWrap: "wrap" }}>
			<Badge badgeContent="Strong" type="strong" variant="inline" />
			<Badge badgeContent="Muted" type="muted" variant="inline" />
			<Badge badgeContent="Outlined" type="outlined" variant="inline" />
		</Stack>
	);
};
`;export{e as default};