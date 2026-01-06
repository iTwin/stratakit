/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { Icon } from "@stratakit/mui";

import menuIcon from "@stratakit/icons/menu.svg";

export default () => {
	return (
		<AppBar position="static">
			<Toolbar>
				<IconButton size="large" edge="start" color="inherit" aria-label="menu">
					<Icon href={`${menuIcon}#icon-large`} size="large" />
				</IconButton>
				<Typography variant="h6" component="div" flexGrow={1}>
					News
				</Typography>
				<Button color="inherit">Login</Button>
			</Toolbar>
		</AppBar>
	);
};
