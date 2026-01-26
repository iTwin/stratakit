/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Icon } from "@stratakit/mui";

import svgMenu from "@stratakit/icons/menu.svg";

export default () => {
	return (
		<AppBar position="static">
			<Toolbar>
				<IconButton size="large" edge="start" aria-label="menu">
					<Icon href={`${svgMenu}#icon-large`} size="large" />
				</IconButton>
				<Typography variant="h6" component="div" flexGrow={1}>
					News
				</Typography>
				<Button variant="text">Login</Button>
			</Toolbar>
		</AppBar>
	);
};
