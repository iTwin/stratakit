/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";

export default () => {
	return (
		<MenuList>
			<MenuItem>Profile</MenuItem>
			<MenuItem>My account</MenuItem>
			<MenuItem>Logout</MenuItem>
		</MenuList>
	);
};
